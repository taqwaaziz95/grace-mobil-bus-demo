import { withBasePath } from "@/lib/basePath";
import BookingModal from "@/components/modal/BookingModal";
import { useState } from "react";
import { Button } from "../button";
import { Users, CarFront } from "lucide-react"; // Icons
import { useRouter } from "next/navigation";

export interface CarCardProps {
	car: any;
	// handleBooking: (car: any) => void;
	category: string;
}

const CarCard: React.FC<CarCardProps> = ({ car, category }) => {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const isShuttle =
		category !== "bandara" && category !== "harian" && category !== "bulanan";

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	function handleBooking(data: object) {
		console.log(data);
		// alert(JSON.stringify(data))
		router.push("/cart");
	}

	console.log("car", car);

	return (
		<>
			{!isShuttle ? (
				/** ==================== RENT CAR LAYOUT ==================== */
				<div className="tw:!border tw:!border-[#dde1de] tw:!bg-white tw:!rounded-xl tw:!shadow-md tw:!overflow-hidden tw:!hover:shadow-lg tw:!transition tw:!w-full">
					{/* Car Image */}
					<div className="tw:!w-full tw:!h-40 tw:!overflow-hidden">
						<img
							src={withBasePath(`${car.image}`)}
							alt={car.name}
							className="tw:!w-full tw:!h-full tw:!object-cover"
						/>
					</div>

					{/* Content */}
					<div className="tw:!p-4">
						<h2 className="tw:!text-lg tw:!font-bold tw:!mb-1">{car.name}</h2>

						{/* Facilities */}
						<div className="tw:!flex tw:!gap-4 tw:!text-sm tw:!text-gray-600 tw:!mb-2">
							<div className="tw:!flex tw:!items-center tw:!gap-1">
								<Users size={16} /> {car.seats || 4} Tempat Duduk
							</div>
							<div className="tw:!flex tw:!items-center tw:!gap-1">
								<CarFront size={16} />{" "}
								{car.isSupir ? "Termasuk Supir" : "Tanpa Supir"}
							</div>
						</div>

						<hr className="tw:!my-3" />

						{/* Price & Button */}
						<div className="tw:!flex tw:!justify-between tw:!items-center">
							<div>
								<p className="tw:!text-lg tw:!font-bold tw:!text-gray-800">
									Rp{car.price.toLocaleString()}{" "}
									<span className="tw:!text-gray-500 tw:!text-xs">/ hari</span>
								</p>
							</div>
						</div>
						<div className="tw:!flex tw:!mt-4 tw:!justify-between tw:!w-full">
							{/* <Button
								onClick={() => router.push("/details?category=" + category)}
								size="small"
								variant="secondary"
								block={false}
								isRightIcon={false}
							>
								Lihat Detail
							</Button> */}
							<Button
								className="tw:!w-full"
								// onClick={() => handleBooking({ ...car, category })}
								onClick={() =>
									router.push("/details/" + car?.id + "?category=" + category)
								}
								size="small"
								block={false}
								isRightIcon={false}
							>
								Lihat Detail
							</Button>
						</div>
					</div>
				</div>
			) : (
				/** ==================== SHUTTLE LAYOUT ==================== */
				<div className="tw:!border tw:!border-[#dde1de] tw:!bg-white tw:!rounded-xl tw:!shadow-md tw:!overflow-hidden tw:!hover:shadow-lg tw:!transition tw:!w-full">
					{/* Shuttle Image */}
					<div className="tw:!w-full tw:!h-40 tw:!overflow-hidden">
						<img
							src={withBasePath(`${car.image}`)}
							alt={car.name}
							className="tw:!w-full tw:!h-full tw:!object-cover"
						/>
					</div>

					{/* Content */}
					<div className="tw:!p-4 tw:!flex tw:!flex-col tw:!gap-3">
						<h2 className="tw:!text-lg tw:!font-extrabold tw:!text-gray-900">
							{car.location}
						</h2>

						<div className="tw:!text-sm tw:!text-gray-700">
							<p>
								<strong>Tanggal:</strong> <span>08/13/2025</span>
							</p>
							<p>
								<strong>Penumpang:</strong> <span>Non-Warga</span>
							</p>
							<p>
								<strong>Armada:</strong> <span>{car.carType} Seat</span>
							</p>
						</div>

						{/* Time, Seat & Price */}
						<div className="tw:!flex tw:!justify-between tw:!text-sm tw:!font-semibold tw:!text-gray-800">
							<div className="tw:!text-left">
								<span className="tw:!block">Jam</span>
								<span className="tw:!block">05:30</span>
							</div>
							<div className="tw:!text-center">
								<span className="tw:!block">Tersedia</span>
								<span className="tw:!block">22 Kursi</span>
							</div>
							<div className="tw:!text-right">
								<span className="tw:!block">Harga</span>
								<span className="tw:!block">Rp40.000</span>
							</div>
						</div>

						<hr className="tw:!my-2" />

						{/* Passenger Input */}
						<div className="tw:!flex tw:!items-center tw:!gap-2">
							<label className="tw:!text-xs">Jumlah Penumpang:</label>
							<input
								type="number"
								min="1"
								max="22"
								defaultValue="1"
								className="tw:!border tw:!rounded-md tw:!w-12 tw:!h-7 tw:!text-center tw:!text-xs focus:tw:!outline-none focus:tw:!ring-1 focus:tw:!ring-[#2A9FD6]"
							/>
						</div>

						{/* Button */}
						<Button onClick={handleOpenModal} block={true} isRightIcon={false}>
							Pesan Sekarang
						</Button>

						{/* <p className="tw:!text-gray-400 tw:!text-xs tw:!mt-1">
							Catatan: Maksimal pembayaran 5 menit setelah pemesanan
						</p> */}
					</div>
				</div>
			)}

			{/* Booking Modal */}
			{isModalOpen && (
				<BookingModal
					car={car}
					onClose={handleCloseModal}
					handleBooking={() => handleBooking({ ...car, category })}
				/>
			)}
		</>
	);
};

export default CarCard;
