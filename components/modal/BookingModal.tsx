import React, { useState } from "react";
import "./BookingModal.css";
import { useRouter } from "next/navigation";

interface BookingModalProps {
	car: any;
	onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ car, onClose }) => {
	const [time, setTime] = useState("");
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
		window.open("/eticket", "_blank");
		onClose();
	};

	const renderSeats = () => {
		const seats = [];
		for (let i = 1; i <= 30; i++) {
			seats.push(
				<div key={`row-${i}`} className="seat-row">
					{["a", "b"].map((suffix) => {
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
				</div>
			);
		}
		return seats;
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<label>
					Book <strong>{car.name}</strong>
				</label>
				<div className="form-group">
					<label>Time</label>
					<input
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Number of Passengers</label>
					<input
						type="number"
						min="1"
						max="60"
						value={passengerCount}
						onChange={(e) => {
							setPassengerCount(parseInt(e.target.value));
							setSelectedSeats([]);
						}}
					/>
				</div>
				<div className="form-group">
					<label>Select Seats</label>
					<div className="seats-container">{renderSeats()}</div>
				</div>
				<button onClick={handleSubmit}>Confirm Booking</button>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default BookingModal;
