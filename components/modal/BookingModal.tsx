import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

interface BookingModalProps {
  car: any;
  onClose: () => void;
  handleBooking: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  car,
  onClose,
  handleBooking,
}) => {
  const [dateSelected, setDateSelected] = useState("");
  const [time, setTime] = useState("");
  const [selectedList, setSelectedList] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const router = useRouter();

  const handleSeatClick = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = () => {
    const bookingDetails = {
      car,
      username: localStorage.getItem("username"),
      date: dateSelected,
      time,
      seats: selectedSeats,
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    handleBooking();
    onClose();
  };

  const renderSeats = () => {
    const layout = [
      ["1", "2", "", "3", "4"],
      ["5", "6", "", "7", "8"],
      ["9", "10", "", "11", "12"],
      ["13", "14", "", "15", "16"],
      ["17", "18", "", "19", "20"],
      ["21", "22", "", "23", "24"],
      ["", "", "", "", ""], // Gap for door
      ["25", "26", "", "", ""],
      ["27", "28", "29", "30", "31"], // Last row full
    ];

    return (
      <div className="tw:!flex tw:!gap-8 tw:!overflow-x-auto tw:!py-3 tw:!scrollbar-hide">
        {layout.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="tw:!flex tw:!flex-col tw:!items-center tw:!gap-2"
          >
            {row.map((seat, index) =>
              seat ? (
                <div
                  key={seat}
                  onClick={() => handleSeatClick(seat)}
                  className={`tw:!w-10 tw:!h-10 tw:!flex tw:!items-center tw:!justify-center tw:!rounded-md tw:!cursor-pointer tw:!border tw:!text-xs tw:!font-semibold
                  ${selectedSeats.includes(seat)
                      ? "tw:!bg-[#2A9FD6] tw:!text-white"
                      : "tw:!bg-white tw:!text-gray-700"
                    } hover:tw:!bg-gray-100`}
                >
                  {seat}
                </div>
              ) : (
                <div
                  key={`empty-${rowIndex}-${index}`}
                  className="tw:!w-10 tw:!h-10"
                ></div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTimeOptions = () => {
    const times = [];
    for (let hour = 5; hour <= 21; hour += 2) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      times.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>
      );
    }
    return times;
  };

  const renderDateOptions = () => {
    const dates = [];
    const today = moment();
    for (let i = 0; i <= 10; i++) {
      const dateValue = today.clone().add(i, "days").format("YYYY-MM-DD");
      dates.push(
        <option key={dateValue} value={dateValue}>
          {today.clone().add(i, "days").format("DD/MM/YYYY")}
        </option>
      );
    }
    return dates;
  };

  useEffect(() => {
    const newSelectedList = { ...selectedList, [dateSelected]: selectedSeats };
    setSelectedList(newSelectedList);
  }, [selectedSeats]);

  useEffect(() => {
    setSelectedSeats(selectedList[dateSelected] || []);
  }, [dateSelected]);

  return (
    <div className="tw:!fixed tw:!inset-0 tw:!flex tw:!items-center tw:!justify-center tw:!bg-black/50 tw:!z-50 tw:!p-4 md:tw:!p-8">
      <div className="tw:!bg-white tw:!rounded-xl tw:!p-6 tw:!w-full tw:!max-w-4xl tw:!shadow-lg">
        <h2 className="tw:!text-2xl tw:!font-bold tw:!mb-6">
          Booking <span className="tw:!text-[#2A9FD6]">{car.name}</span>
        </h2>
        <div className="tw:!grid tw:!grid-cols-1 tw:md:!grid-cols-2 tw:!gap-4 tw:!mb-4">
          {/* Time */}
          <div>
            <label className="tw:!block tw:!text-sm tw:!font-medium tw:!mb-1">
              Pilih Waktu
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="tw:!w-full tw:!border tw:!rounded-md tw:!p-2 focus:tw:!ring-1 focus:tw:!ring-[#2A9FD6]"
            >
              <option value="">Pilih...</option>
              {renderTimeOptions()}
            </select>
          </div>

          {time && (
            <div>
              <label className="tw:!block tw:!text-sm tw:!font-medium tw:!mb-1">
                Pilih Tanggal
              </label>
              <select
                value={dateSelected}
                onChange={(e) => setDateSelected(e.target.value)}
                className="tw:!w-full tw:!border tw:!rounded-md tw:!p-2 focus:tw:!ring-1 focus:tw:!ring-[#2A9FD6]"
              >
                <option value="">Pilih...</option>
                {renderDateOptions()}
              </select>
            </div>
          )}



          {/* Passenger Count */}
          <div>
            <label className="tw:!block tw:!text-sm tw:!font-medium tw:!mb-1">
              Jumlah Penumpang
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={passengerCount}
              onChange={(e) => {
                setPassengerCount(parseInt(e.target.value));
                setSelectedList({});
                setSelectedSeats([]);
              }}
              className="tw:!w-full tw:!border tw:!rounded-md tw:!p-2 tw:!text-center focus:tw:!ring-1 focus:tw:!ring-[#2A9FD6]"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="tw:!block tw:!text-sm tw:!font-medium tw:!mb-1">
              Destinasi
            </label>
            <input
              type="text"
              value={car.location}
              disabled
              className="tw:!w-full tw:!border tw:!rounded-md tw:!p-2 tw:!bg-gray-100"
            />
          </div>

        </div>

        {/* Seats Selection */}
        {time && passengerCount > 0 && dateSelected && (
          <div className="tw:!mb-4">
            <label className="tw:!block tw:!text-sm tw:!font-medium tw:!mb-2">
              Pilih Kursi
            </label>
            {renderSeats()}
          </div>
        )}

        {/* Buttons */}
        <div className="tw:!flex tw:!justify-between tw:!gap-4 tw:!mt-6">
          <button
            onClick={onClose}
            className="tw:!bg-gray-200 tw:!text-gray-800 tw:!px-4 tw:!py-2 tw:!rounded-md tw:!font-semibold hover:tw:!bg-gray-300"
          >
            Tutup
          </button>
          {time && dateSelected && selectedSeats.length > 0 && (
            <button
              onClick={handleSubmit}
              className="tw:!bg-[#2A9FD6] tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded-md tw:!font-semibold hover:tw:!bg-[#238bb8]"
            >
              Tambah ke Keranjang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;