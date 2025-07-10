import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSearch from "./HeroSearch";

export default function ShuttleFilter({ category = "resident" }) {
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
        <div className="left-top-search">
          <button
            className={`category-link text-sm-bold btn-click ${
              selectedCategory === "resident" ? "active" : ""
            } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
            onClick={() => setSelectedCategory("resident")}
          >
            Resident
          </button>
          <button
            className={`category-link text-sm-bold btn-click ${
              selectedCategory === "korporat" ? "active" : ""
            } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
            onClick={() => setSelectedCategory("korporat")}
          >
            Korporat
          </button>
          <button
            className={`category-link text-sm-bold btn-click ${
              selectedCategory === "antar-kota" ? "active" : ""
            } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
            onClick={() => setSelectedCategory("antar-kota")}
          >
            Antar Kota
          </button>
          <button
            className={`category-link text-sm-bold btn-click ${
              selectedCategory === "mall" ? "active" : ""
            } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
            onClick={() => setSelectedCategory("mall")}
          >
            Shopping Mall
          </button>
        </div>
        <div className="right-top-search d-none d-md-flex">
          <Link className="text-sm-medium need-some-help" href="/contact">
            Need help?
          </Link>
        </div>
      </div>
      <HeroSearch category={selectedCategory} />
    </div>
  );
}
