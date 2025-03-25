import React, { useEffect, useState } from "react";
import "./BookingModal.css";
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
      date: new Date().toLocaleDateString(),
      time,
      seats: selectedSeats,
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    // window.open("/eticket", "_blank");
    // handleBooking();
    onClose();
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 5; i++) {
      seats.push(
        <div key={`row-${i}`} className="seat-row">
          {["A", "B", "C"].map((suffix) => {
            const seat = `${i}${suffix}`;
            const isSelected = selectedSeats.includes(seat);
            return (
              <div
                key={seat}
                className={`seat ${isSelected ? "selected" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </div>
            );
          })}
          <div className="seat-spacer"></div>
          {["D", "E"].map((suffix) => {
            const seat = `${i}${suffix}`;
            const isSelected = selectedSeats.includes(seat);
            return (
              <>
                <div
                  key={seat}
                  className={`seat ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              </>
            );
          })}
        </div>
      );
    }
    return seats;
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
      dates.push(
        <option
          key={today.clone().add(i, "days").format("YYYY-MM-DD")}
          value={today.clone().add(i, "days").format("YYYY-MM-DD")}
        >
          {today.clone().add(i, "days").format("DD/MM/YYYY")} {time} -{" "}
          {selectedList[
            today.clone().add(i, "days").format("YYYY-MM-DD")
          ]?.join(", ")}
        </option>
      );
    }

    return dates;
  };

  useEffect(() => {
    let newSelectedList = { ...selectedList, [dateSelected]: selectedSeats };

    setSelectedList(newSelectedList);
  }, [selectedSeats]);

  useEffect(() => {
    setSelectedSeats(selectedList[dateSelected] || []);
  }, [dateSelected]);

  return (
    <div className="modal">
      <div className="modal-content">
        <label>
          Book <strong>{car.name}</strong>
        </label>

        <div className="form-group">
          <label>Waktu</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Pilih...</option>
            {renderTimeOptions()}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Destinasi</label>
            <input type="text" value={car.location} disabled />
          </div>

          <div className="form-group">
            <label>Jumlah Penumpang</label>
            <input
              type="number"
              min="1"
              max="3"
              value={passengerCount}
              onChange={(e) => {
                setPassengerCount(parseInt(e.target.value));
                setSelectedList({});
                setSelectedSeats([]);
              }}
            />
          </div>
        </div>
        {time != "" && passengerCount > 0 && <hr />}
        {time != "" && passengerCount > 0 && (
          <div className="form-group">
            <label>Tanggal</label>

            <select
              value={dateSelected}
              onChange={(e) => setDateSelected(e.target.value)}
            >
              <option value="" disabled>
                Pilih...
              </option>
              {renderDateOptions()}
            </select>
          </div>
        )}
        {time != "" && passengerCount > 0 && dateSelected != "" && (
          <div className="form-group">
            <label>Bangku</label>
            <div className="seats-container">{renderSeats()}</div>
          </div>
        )}
        <div className="tw:!flex tw:!justify-between tw:!items-center tw:!mt-6">
          <button
            onClick={onClose}
            className="tw:!bg-black tw:!text-white tw:!font-semibold tw:!py-2 tw:!px-5 tw:!rounded-lg tw:!hover:bg-gray-800 tw:!transition"
          >
            Tutup
          </button>
          {time != "" && dateSelected != "" && passengerCount > 0 && (
            <button
              onClick={handleSubmit}
              className="tw:!bg-black tw:!text-white tw:!font-semibold tw:!py-2 tw:!px-5 tw:!rounded-lg tw:!hover:bg-gray-800 tw:!transition"
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
