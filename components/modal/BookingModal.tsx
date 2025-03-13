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
		for (let i = 1; i <= 5; i++) {
			seats.push(
				<div key={`row-${i}`} className="seat-row">
					{["a", "b", "c"].map((suffix) => {
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
					{["d", "e"].map((suffix) => {
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
		for (let hour = 5; hour <= 21; hour++) {
			const timeString = `${hour.toString().padStart(2, "0")}:00`;
			times.push(
				<option key={timeString} value={timeString}>
					{timeString}
				</option>
			);
		}
		return times;
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<label>
					Book <strong>{car.name}</strong>
				</label>

				<div className="form-group">
					<label>Time</label>
					<select value={time} onChange={(e) => setTime(e.target.value)}>
						<option value="" disabled>
							Select a time
						</option>
						{renderTimeOptions()}
					</select>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label>Destination</label>
						<input type="text" value={car.location} disabled />
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
				</div>
				<div className="form-group">
					<label>Select Seats</label>
					<div className="seats-container">{renderSeats()}</div>
				</div>
				<div style={{ display: "flex", alignSelf: "flex-end" }}>
					<div className="flex justify-end space-x-2 mt-4">
						<button
							onClick={onClose}
							className="bg-black text-white font-bold py-2 px-4  rounded"
						>
							Close
						</button>
						<button
							onClick={handleSubmit}
							className="bg-black text-white font-bold py-2 px-4 rounded"
						>
							Confirm Booking
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;
