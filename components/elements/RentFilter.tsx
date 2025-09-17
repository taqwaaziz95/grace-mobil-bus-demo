import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSearch from "./HeroSearch";
import { Button } from "../button";

export default function RentFilter({ category = "harian" }) {
	const [user, setUser] = useState<string | null>(null);
	const [isUserChecked, setIsUserChecked] = useState(false);

	useEffect(() => {
		// Check if user is logged in
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) {
			setUser(loggedInUser);
		}
		setIsUserChecked(true);
	}, []);

	const [selectedCategory, updateSelectedCategory] = useState<string>(category);

	if (!isUserChecked) {
		return null; // or a loading spinner
	}

	function setSelectedCategory(category: string): void {
		updateSelectedCategory(category);
	}

	return (
		<div className="box-search-advance background-card tw:!top-0">
			<div className="box-top-search">
				<div className="left-top-search tw:!flex tw:!gap-2 tw:!flex-wrap">
					<Button
						variant={selectedCategory === "bandara" ? "primary" : "secondary"}
						size="small"
						block={false}
						isRightIcon={false}
						className={`${selectedCategory === "bandara" ? "active" : ""}`}
						onClick={() => setSelectedCategory("bandara")}
					>
						Antar Jemput Bandara
					</Button>
					<Button
						variant={selectedCategory === "harian" ? "primary" : "secondary"}
						size="small"
						block={false}
						isRightIcon={false}
						className={`${selectedCategory === "harian" ? "active" : ""}`}
						onClick={() => setSelectedCategory("harian")}
					>
						Harian
					</Button>
					<Button
						variant={selectedCategory === "bulanan" ? "primary" : "secondary"}
						size="small"
						block={false}
						isRightIcon={false}
						className={`${selectedCategory === "bulanan" ? "active" : ""}`}
						onClick={() => setSelectedCategory("bulanan")}
					>
						Bulanan
					</Button>
				</div>
				<div className="right-top-search d-none d-md-flex">
					<Link className="text-sm-medium need-some-help" href="/contact">
						Butuh Bantuan?
					</Link>
				</div>
			</div>
			<HeroSearch category={selectedCategory} />
		</div>
	);
}
