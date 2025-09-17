"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, {
	Marker,
	Popup,
	NavigationControl,
	GeolocateControl,
	FullscreenControl,
	ScaleControl,
	Source,
	Layer,
	type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

/** Innsbruck center */
const CENTER = { lat: 47.2692, lng: 11.4041 };

/** ---------- Types ---------- */
type VehicleType = "bus" | "car";
type Vehicle = {
	id: string;
	type: VehicleType;
	name: string;
	path: [number, number][]; // [lat, lng]
	segIndex: number;
	segT: number; // 0..1 within segment
	speedKmh: number;
	occupancy?: number; // buses
	capacity?: number; // buses
	routeName?: string; // buses
};

/** ---------- Helpers ---------- */
const toRad = (d: number) => (d * Math.PI) / 180;
function haversineMeters(a: [number, number], b: [number, number]) {
	const R = 6378137;
	const dLat = toRad(b[0] - a[0]);
	const dLng = toRad(b[1] - a[1]);
	const la1 = toRad(a[0]);
	const la2 = toRad(b[0]);
	const s =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(s));
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpLatLng = (a: [number, number], b: [number, number], t: number) =>
	[lerp(a[0], b[0], t), lerp(a[1], b[1], t)] as [number, number];

function advanceAlongPath(
	path: [number, number][],
	segIndex: number,
	segT: number,
	stepMeters: number
) {
	let idx = segIndex;
	let t = segT;
	if (path.length < 2) return { idx, t, pos: path[0] };

	while (stepMeters > 0) {
		const A = path[idx];
		const B = path[(idx + 1) % path.length];
		const segLen = haversineMeters(A, B);
		const remain = (1 - t) * segLen;
		if (stepMeters < remain) {
			t += stepMeters / segLen;
			stepMeters = 0;
		} else {
			stepMeters -= remain;
			idx = (idx + 1) % path.length;
			t = 0;
		}
	}
	const A = path[idx];
	const B = path[(idx + 1) % path.length];
	return { idx, t, pos: lerpLatLng(A, B, t) };
}

const pathToGeoJSON = (path: [number, number][]) => ({
	type: "Feature" as const,
	geometry: {
		type: "LineString" as const,
		// GeoJSON wants [lng, lat]
		coordinates: path.map(([lat, lng]) => [lng, lat]),
	},
	properties: {},
});

/** ---------- Routes: 4 distinct bus lines around Innsbruck ---------- */
const ROUTES: Record<string, [number, number][]> = {
	BUS_01: [
		[47.263, 11.401], // Innsbruck Hbf
		[47.26, 11.344], // Airport INN
		[47.259, 11.317], // Völs
		[47.263, 11.401], // back to Hbf
	],
	BUS_02: [
		[47.263, 11.401],
		[47.2853, 11.3972], // Hungerburg valley
		[47.279, 11.414], // Alpenzoo-ish
		[47.263, 11.401],
	],
	BUS_03: [
		[47.263, 11.401],
		[47.2481, 11.4004], // Bergisel
		[47.254, 11.438], // Ambras
		[47.263, 11.401],
	],
	BUS_04: [
		[47.263, 11.401],
		[47.281, 11.505], // Hall in Tirol
		[47.2805, 11.4195], // Mühlau
		[47.263, 11.401],
	],
};
const ROUTE_NAMES: Record<keyof typeof ROUTES, string> = {
	BUS_01: "Hbf → Airport → Völs → Hbf",
	BUS_02: "Hbf → Hungerburg → Alpenzoo → Hbf",
	BUS_03: "Hbf → Bergisel → Ambras → Hbf",
	BUS_04: "Hbf → Hall in Tirol → Mühlau → Hbf",
};

/** ---------- Cars: two small local loops ---------- */
const CAR_LOOPS: Record<string, [number, number][]> = {
	CAR_01: [
		[47.267, 11.4], // old town area
		[47.2685, 11.4085],
		[47.2725, 11.4055],
		[47.269, 11.398],
		[47.267, 11.4],
	],
	CAR_02: [
		[47.2595, 11.345], // near airport
		[47.261, 11.355],
		[47.2575, 11.36],
		[47.258, 11.348],
		[47.2595, 11.345],
	],
};

/** ---------- Vehicle factories ---------- */
const makeBus = (
	id: string,
	routeKey: keyof typeof ROUTES,
	name: string,
	speedKmh = 34
): Vehicle => {
	const capacity = Math.random() < 0.5 ? 25 : 40;
	return {
		id,
		type: "bus",
		name,
		path: ROUTES[routeKey],
		segIndex: 0,
		segT: 0,
		speedKmh,
		occupancy: Math.floor(Math.random() * (capacity - 5)) + 5,
		capacity,
		routeName: ROUTE_NAMES[routeKey],
	};
};

const makeCar = (
	id: string,
	loopKey: keyof typeof CAR_LOOPS,
	name: string,
	speedKmh = 32
): Vehicle => ({
	id,
	type: "car",
	name,
	path: CAR_LOOPS[loopKey],
	segIndex: 0,
	segT: 0,
	speedKmh,
});

/** ---------- Main Component ---------- */
export default function LiveFleetMap({
	mapStyle = "https://demotiles.maplibre.org/styles/osm-bright-gl-style/style.json",
	refreshMs = 1000,
}: {
	mapStyle?: string;
	refreshMs?: number;
}) {
	const mapRef = useRef<MapRef | null>(null);

	const [fleet, setFleet] = useState<Vehicle[]>([
		makeBus("BUS-101", "BUS_01", "Shuttle A", 34),
		makeBus("BUS-102", "BUS_02", "Shuttle B", 36),
		makeBus("BUS-103", "BUS_03", "Shuttle C", 33),
		makeBus("BUS-104", "BUS_04", "Shuttle D", 35),
		makeCar("CAR-201", "CAR_01", "Car Alpha", 30),
		makeCar("CAR-202", "CAR_02", "Car Beta", 38),
	]);

	const [positions, setPositions] = useState<Record<string, [number, number]>>(
		() => Object.fromEntries(fleet.map((v) => [v.id, v.path[0]]))
	);
	const [selected, setSelected] = useState<Vehicle | null>(null);

	// search + filter (now lives in the right panel)
	const [query, setQuery] = useState("");

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current || !mapRef.current) return;
		const ro = new ResizeObserver(() => {
			// Resize the WebGL canvas to the new container size
			mapRef.current?.resize();
		});
		ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, []);

	// Move everyone every refreshMs
	useEffect(() => {
		const id = setInterval(() => {
			setFleet((prev) =>
				prev.map((v) => {
					const step = (v.speedKmh * 1000 * refreshMs) / 3600000; // v * t
					const adv = advanceAlongPath(v.path, v.segIndex, v.segT, step);
					setPositions((p) => ({ ...p, [v.id]: adv.pos }));
					return { ...v, segIndex: adv.idx, segT: adv.t };
				})
			);
		}, refreshMs);
		return () => clearInterval(id);
	}, [refreshMs]);

	const buses = useMemo(() => fleet.filter((f) => f.type === "bus"), [fleet]);

	// GeoJSON for faint routes (all buses)
	const faintRoutesGeoJSON = useMemo(
		() => ({
			type: "FeatureCollection" as const,
			features: buses.map((b) => pathToGeoJSON(b.path)),
		}),
		[buses]
	);

	// GeoJSON for highlighted selected bus route
	const selectedRouteGeoJSON = useMemo(() => {
		if (!selected || selected.type !== "bus") return null;
		return pathToGeoJSON(selected.path);
	}, [selected]);

	// Fit all visible vehicles
	const fitAll = () => {
		const pts = fleet.map((v) => positions[v.id] ?? v.path[0]);
		if (!mapRef.current || pts.length === 0) return;
		const lngs = pts.map((p) => p[1]);
		const lats = pts.map((p) => p[0]);
		const bounds: [[number, number], [number, number]] = [
			[Math.min(...lngs), Math.min(...lats)],
			[Math.max(...lngs), Math.max(...lats)],
		];
		mapRef.current.fitBounds(bounds, { padding: 48, duration: 700 });
	};

	// Focus a specific vehicle
	const focusVehicle = (v: Vehicle) => {
		setSelected(v);
		const map = mapRef.current;
		if (!map) return;

		if (v.path.length >= 2) {
			const lngs = v.path.map((p) => p[1]);
			const lats = v.path.map((p) => p[0]);
			const bounds: [[number, number], [number, number]] = [
				[Math.min(...lngs), Math.min(...lats)],
				[Math.max(...lngs), Math.max(...lats)],
			];
			map.fitBounds(bounds, { padding: 48, duration: 700 });
		} else {
			const pos = positions[v.id] ?? v.path[0];
			map.flyTo({
				center: { lng: pos[1], lat: pos[0] },
				zoom: 14,
				duration: 700,
			});
		}
	};

	// Sidebar filtered list
	const filteredList = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return fleet;
		return fleet.filter((v) => {
			const inId = v.id.toLowerCase().includes(q);
			const inName = v.name.toLowerCase().includes(q);
			const inType = v.type.toLowerCase().includes(q);
			const inRoute = (v.routeName ?? "").toLowerCase().includes(q);
			return inId || inName || inType || inRoute;
		});
	}, [fleet, query]);

	return (
		<div
			className="
      tw:!relative
      tw:!flex tw:!flex-col   /* default: stack vertically */
      lg:tw:!flex-row         /* desktop: row layout */
      tw:!gap-4 tw:!items-stretch
    "
			style={{ minHeight: "70vh" }}
		>
			{/* LEFT: Map (¾ width) */}
			<div
				className="
  tw:!relative tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!overflow-hidden
  tw:!w-full tw:!h-[58dvh]    /* mobile/tablet height */
  lg:tw:!h-[70vh]             /* desktop height */
  lg:tw:!flex-[3]             /* keep 3/4 width on desktop */
"
			>
				<Map
					ref={mapRef}
					initialViewState={{
						longitude: CENTER.lng,
						latitude: CENTER.lat,
						zoom: 12.5,
					}}
					style={{ width: "100%", height: "100%" }}
					mapStyle={mapStyle}
					dragRotate
				>
					<NavigationControl position="top-right" />
					<FullscreenControl position="top-right" />
					<ScaleControl position="bottom-left" />
					<GeolocateControl
						position="top-right"
						trackUserLocation
						// showUserHeading
					/>

					{/* All bus routes (faint) */}
					<Source id="routes-faint" type="geojson" data={faintRoutesGeoJSON}>
						<Layer
							id="routes-faint-line"
							type="line"
							paint={
								{
									"line-color": "#93c5fd",
									"line-opacity": 0.35,
									"line-width": 4,
								} as any
							}
						/>
					</Source>

					{/* Selected bus route (highlight) */}
					{selectedRouteGeoJSON && (
						<Source
							id="route-selected"
							type="geojson"
							data={selectedRouteGeoJSON}
						>
							<Layer
								id="route-selected-line"
								type="line"
								paint={
									{
										"line-color": "#2563eb",
										"line-opacity": 0.9,
										"line-width": 6,
									} as any
								}
							/>
						</Source>
					)}

					{/* Vehicles */}
					{fleet.map((v) => {
						const pos = positions[v.id] ?? v.path[0];
						const isSelected = selected?.id === v.id;
						return (
							<Marker
								key={v.id}
								longitude={pos[1]}
								latitude={pos[0]}
								anchor="bottom"
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										focusVehicle(v);
									}}
									aria-label={v.name}
									className="tw:!grid tw:!place-items-center"
									style={{ transform: "translate(-50%, -100%)" }}
								>
									<div
										className={`tw:!rounded-full tw:!shadow tw:!bg-white ${
											v.type === "bus"
												? `tw:!border-2 ${
														isSelected
															? "tw:!border-blue-700"
															: "tw:!border-blue-500"
													} tw:!w-8 tw:!h-8`
												: "tw:!border-2 tw:!border-emerald-600 tw:!w-7 tw:!h-7"
										}`}
										title={v.name}
									>
										<div className="tw:!w-full tw:!h-full tw:!grid tw:!place-items-center">
											{v.type === "bus" ? "🚌" : "🚗"}
										</div>
									</div>
								</button>
							</Marker>
						);
					})}

					{/* Popup for selected */}
					{selected && (
						<Popup
							longitude={(positions[selected.id] ?? selected.path[0])[1]}
							latitude={(positions[selected.id] ?? selected.path[0])[0]}
							anchor="top"
							onClose={() => setSelected(null)}
							closeOnClick={false}
						>
							<div className="tw:!text-sm tw:!space-y-1">
								<div className="tw:!font-semibold">
									{selected.name}{" "}
									<span className="tw:!text-gray-500">({selected.id})</span>
								</div>
								<div className="tw:!text-gray-700">
									Tipe: {selected.type === "bus" ? "Bus" : "Mobil"}
								</div>
								{selected.type === "bus" && (
									<>
										{selected.routeName && (
											<div className="tw:!text-gray-700">
												Rute: {selected.routeName}
											</div>
										)}
										<div className="tw:!text-gray-700">
											Occupancy: {selected.occupancy}/{selected.capacity}
										</div>
										<div className="tw:!text-[12px] tw:!text-blue-600">
											Rute bus disorot di peta.
										</div>
									</>
								)}
								<div className="tw:!text-gray-700">
									Kecepatan: {Math.round(selected.speedKmh)} km/j
								</div>
							</div>
						</Popup>
					)}
				</Map>
			</div>

			{/* RIGHT: Sidebar (¼ width) */}
			<aside
				className="
        tw:!flex tw:!flex-col tw:!gap-3
        tw:!w-full              /* mobile: full width under map */
        lg:tw:!flex-[1]         /* desktop: 1/4 width on right */
      "
			>
				{/* Controls (Fit + Search) */}
				<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-3">
					<button
						onClick={fitAll}
						className="tw:!w-full tw:!mb-2 tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!bg-white tw:!border tw:!border-gray-300 tw:!text-sm hover:tw:!bg-gray-50"
						type="button"
					>
						Fit Semua
					</button>
					<div className="tw:!relative">
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Cari kode, rute, bus/mobil…"
							className="tw:!w-full tw:!pl-9 tw:!pr-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
						/>
						<svg
							className="tw:!absolute tw:!left-2.5 tw:!top-1/2 tw:!-translate-y-1/2 tw:!text-gray-400"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="11"
								cy="11"
								r="8"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								d="M21 21L16.65 16.65"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>

				{/* Armada Saat Ini (list) */}
				<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-3">
					<div className="tw:!flex tw:!items-center tw:!justify-between tw:!mb-2">
						<div className="tw:!font-medium">Armada Saat Ini</div>
						<span className="tw:!text-xs tw:!text-gray-500">
							{filteredList.length} unit
						</span>
					</div>

					<div className="tw:!max-h-[60vh] tw:!overflow-auto tw:!space-y-2">
						{filteredList.length === 0 && (
							<div className="tw:!text-sm tw:!text-gray-500 tw:!text-center tw:!py-6">
								Tidak ada hasil untuk pencarian.
							</div>
						)}

						{filteredList.map((v) => {
							const pos = positions[v.id] ?? v.path[0];
							const isSelected = selected?.id === v.id;
							const isBus = v.type === "bus";
							return (
								<button
									key={v.id}
									onClick={() => focusVehicle(v)}
									className={`tw:!w-full tw:!text-left tw:!rounded-xl tw:!border tw:!p-3 hover:tw:!bg-gray-50 tw:!transition ${
										isSelected
											? "tw:!border-blue-300 tw:!bg-blue-50/40"
											: "tw:!border-gray-200"
									}`}
									title={`${v.name} (${v.id})`}
								>
									<div className="tw:!flex tw:!items-start tw:!gap-3">
										<div
											className={`tw:!rounded-full tw:!grid tw:!place-items-center ${
												isBus
													? "tw:!w-8 tw:!h-8 tw:!border-2 tw:!border-blue-500"
													: "tw:!w-7 tw:!h-7 tw:!border-2 tw:!border-emerald-600"
											} tw:!bg-white tw:!shadow`}
										>
											{isBus ? "🚌" : "🚗"}
										</div>
										<div className="tw:!min-w-0 tw:!flex-1">
											<div className="tw:!flex tw:!items-center tw:!gap-2 tw:!mb-0.5">
												<span className="tw:!font-medium tw:!truncate">
													{v.name}
												</span>
												<span className="tw:!text-xs tw:!text-gray-500">
													({v.id})
												</span>
											</div>
											{isBus && v.routeName && (
												<div className="tw:!text-xs tw:!text-gray-600 tw:!truncate">
													{v.routeName}
												</div>
											)}
											<div className="tw:!mt-1 tw:!flex tw:!items-center tw:!gap-2">
												<span
													className={`tw:!inline-flex tw:!items-center tw:!px-2 tw:!py-0.5 tw:!rounded-full tw:!text-[11px] ${
														isBus
															? "tw:!bg-blue-50 tw:!text-blue-700 tw:!border tw:!border-blue-200"
															: "tw:!bg-emerald-50 tw:!text-emerald-700 tw:!border tw:!border-emerald-200"
													}`}
												>
													{isBus ? "Bus" : "Mobil"}
												</span>
												<span className="tw:!text-[11px] tw:!text-gray-600">
													{Math.round(v.speedKmh)} km/j
												</span>
												{isBus && (
													<span className="tw:!text-[11px] tw:!text-gray-600">
														{v.occupancy}/{v.capacity} kursi
													</span>
												)}
												<span className="tw:!text-[11px] tw:!text-gray-500">
													{pos[0].toFixed(3)}, {pos[1].toFixed(3)}
												</span>
											</div>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Tiny helper/legend card */}
				<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-3">
					<div className="tw:!text-xs tw:!text-gray-600">
						Klik item untuk memfokuskan peta & menyorot rute. Klik marker di
						peta untuk melihat detail singkat.
					</div>
				</div>
			</aside>
		</div>
	);
}
