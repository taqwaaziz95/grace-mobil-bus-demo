"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/navigation";
import moment from "moment";
import Button from "@/components/button";

interface Ticket {
  bookingCode: string;
  busName: string;
  seat: string;
  route: string;
  dateTime: string;
  price: number;
}

const BookingPage = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  // Load and convert bookingDetails into individual tickets
  useEffect(() => {
    const stored = localStorage.getItem("bookingDetails");
    if (stored) {
      const parsed = JSON.parse(stored);
      const bookingsArray = Array.isArray(parsed) ? parsed : [parsed];

      const formattedTickets: Ticket[] = [];
      bookingsArray.forEach((item: any, idx: number) => {
        const routeParts = item.car.location.split("->");
        const from = routeParts[0]?.trim();
        const to = routeParts[1]?.trim();

        item.seats.forEach((seat: string, seatIdx: number) => {
          formattedTickets.push({
            bookingCode: `BK-${item.car.id}-${idx + 1}-${seatIdx + 1}`,
            busName: item.car.name,
            seat,
            route: `${from} → ${to}`,
            dateTime: `${item.date} ${item.time}`,
            price: item.car.price,
          });
        });
      });

      setTickets(formattedTickets);
    }
  }, []);

  const handleSelect = (idx: number) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const subtotal = selected.reduce((sum, idx) => sum + tickets[idx].price, 0);
  const ppn = subtotal * 0.11;
  const transfee = 5000;
  const total = subtotal + ppn + transfee;

  const handleCheckout = () => {
    const details = {
      tickets: selected.map((i) => tickets[i]),
      subtotal,
      ppn,
      transfee,
      total,
      date: new Date().toISOString(),
    };
    localStorage.setItem("checkoutDetails", JSON.stringify(details));
    router.push("/checkout");
  };

  return (
    <Layout footerStyle={1}>
      <div className="tw:!max-w-6xl tw:!pt-12 tw:!pb-12 tw:!mx-auto tw:!p-6 tw:!bg-white tw:!rounded-xl">
        <h2 className="tw:!text-2xl tw:!font-bold tw:!mb-6 tw:!text-center">
          Pesanan
        </h2>

        {/* Tickets Section */}
        {tickets.length === 0 ? (
          <p className="tw:!text-center tw:!text-gray-500">No tickets found.</p>
        ) : (
          <div className="tw:!flex tw:!flex-wrap tw:!justify-center tw:!gap-0">
            {tickets.map((t, idx) => (
              <div className="tw:!m-3 tw:!min-w-[240px]">
                <div
                  key={idx}
                  className={`tw:!bg-gray-50 tw:!rounded-lg tw:!p-4 tw:!border tw:!shadow-sm tw:!transition tw:!duration-200 tw:!flex tw:!flex-col tw:!justify-between 
                  
                  ${selected.includes(idx)
                      ? "tw:!border-[#2A9FD6] tw:!ring-2 tw:!ring-[#2A9FD6]/30"
                      : "tw:!border-gray-200"
                    }`}
                >
                  <div className="tw:!space-y-1">
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">
                        Kode
                      </span>
                      <span className="tw:!text-gray-800">{t.bookingCode}</span>
                    </div>
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">Jurusan</span>
                      <span className="tw:!text-gray-800">{t.route}</span>
                    </div>
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">No. Bangku</span>
                      <span className="tw:!text-gray-800">{t.seat}</span>
                    </div>
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">Tanggal</span>
                      <span className="tw:!text-gray-800">{moment(t.dateTime).format("DD/MM/YYYY")}</span>
                    </div>
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">Waktu</span>
                      <span className="tw:!text-gray-800">{moment(t.dateTime).format("HH:mm")}</span>
                    </div>
                    <div className="tw:!flex tw:!justify-between">
                      <span className="tw:!font-semibold tw:!text-gray-600">Harga</span>
                      <span className="tw:!text-[#2A9FD6] tw:!font-bold">Rp{t.price.toLocaleString("id-ID")}</span>
                    </div>

                  </div>
                  <div className="tw:!mt-3 tw:!flex tw:!justify-end">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleSelect(idx)}
                      className="tw:!w-6 tw:!h-6 tw:!accent-[#2A9FD6]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {selected.length > 0 && (
          <div className="tw:!mt-8 tw:!bg-gray-50 tw:!p-4 tw:!rounded-lg tw:!border tw:!border-gray-200 tw:!shadow-inner">
            <div className="tw:!flex tw:!justify-between">
              <span className="tw:!text-gray-600">Subtotal</span>
              <span className="tw:!font-semibold">
                Rp{subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="tw:!flex tw:!justify-between">
              <span className="tw:!text-gray-600">PPN (11%)</span>
              <span className="tw:!font-semibold">
                Rp{ppn.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="tw:!flex tw:!justify-between">
              <span className="tw:!text-gray-600">Biaya Transaksi</span>
              <span className="tw:!font-semibold">
                Rp{transfee.toLocaleString("id-ID")}
              </span>
            </div>
            <hr className="tw:!my-2" />
            <div className="tw:!flex tw:!justify-between tw:!text-lg tw:!font-bold">
              <span className="tw:!text-gray-800">Grand Total</span>
              <span className="tw:!text-[#2A9FD6]">
                Rp{total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        )}


        <div className="tw:!flex tw:!mt-6 tw:!gap-4 tw:!justify-between">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="tw:!flex-1"
          >
            Back
          </Button>
          <Button
            disabled={selected.length === 0}
            onClick={handleCheckout}
            className="tw:!flex-1"
          >
            Lanjutkan
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;