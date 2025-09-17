import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface RouteProps {
	source: [number, number];
	destination: [number, number];
}

const Route: React.FC<RouteProps> = ({ source, destination }) => {
	const map = useMap();

	useEffect(() => {
		const fetchRoute = async () => {
			const response = await fetch(
				`https://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full`
			);
			const json = await response.json();
			interface Waypoint {
				location: [number, number];
				// Add other properties if needed
			}

			interface OSRMResponse {
				waypoints: Waypoint[];
				// Add other properties if needed
			}

			const osrmData: OSRMResponse = json;
			const coordinates: [number, number][] = osrmData.waypoints.map(
				(waypoint: Waypoint) => [waypoint.location[1], waypoint.location[0]]
			);
			console.log("coordinates", coordinates);
			L.polyline(coordinates, { color: "red" }).addTo(map);
		};

		fetchRoute();
	}, [source, destination, map]);

	return null;
};

export default Route;
