"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import MyDatePicker from "./MyDatePicker";
import Link from "next/link";
import { filter } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function getMonth(date: any) {
  console.log("MONTH", date);
  return moment(date).format("M");
}

function getYear(date: any) {
  console.log("YEAR", date);
  return moment(date).format("YYYY");
}

export default function HeroSearch({ category = "" }) {
  const [pickUpLocation, setPickUpLocation] = useState("Central Park");
  const [dropOffLocation, setDropOffLocation] = useState("Pondok Indah");
  const [passengerType, setPassengerType] = useState("Warga");
  const [durasi, setDurasi] = useState("6 Bulan");

  const [startDateShuttle, setStartDateShuttle] = useState(new Date());
  const [endDateShuttle, setEndDateShuttle] = useState(new Date());

  const [startDateRent, setStartDateRent] = useState(new Date());
  const [endDateRent, setEndDateRent] = useState(new Date());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const isShuttle =
    category != "bandara" && category != "harian" && category != "bulanan";

  const durasiList = ["6 Bulan", "12 Bulan", "24 Bulan"];

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let pickUpLocations = [
    "Central Park",
    "Pondok Indah",
    "Kemang",
    "Menteng",
    "Kebayoran Baru",
    "Tebet",
    "Kelapa Gading",
    "Sudirman",
  ];

  let dropOffLocations = [
    "Central Park",
    "Pondok Indah",
    "Kemang",
    "Menteng",
    "Kebayoran Baru",
    "Tebet",
    "Kelapa Gading",
    "Sudirman",
  ];

  if (category == "korporat") {
    dropOffLocations = [
      "PT Citra Abadi Sejati",
      "PT Solusi Integrasi Teknologi",
    ];
  }

  if (category == "antar-kota") {
    pickUpLocations = ["Jakarta", "Bandung", "Jogja", "Bali"];
    dropOffLocations = ["Jakarta", "Bandung", "Jogja", "Bali"];
  }

  if (category == "mall") {
    dropOffLocations = [
      "Mall Pondok Indah",
      "Mall Bintaro Xchange",
      "Mall Gandaria City",
      "Mall Emporium Pluit",
    ];
  }

  if (category == "bandara") {
    pickUpLocations = [
      "Bandar Udara Internasional Soekarno–Hatta",
      "Bandar Udara Internasional Halim Perdanakusuma",
      "Bandar Udara Internasional Jawa Barat Kertajati",
      "Bandar Udara Internasional Husein Sastranegara",
    ];
  }

  console.log("category", category);

  dropOffLocations = filter(dropOffLocations, (o: any) => {
    return o != pickUpLocation;
  });

  useEffect(() => {
    setPickUpLocation(pickUpLocations[0]);
    setDropOffLocation(dropOffLocations[0]);
  }, [category, pickUpLocations, dropOffLocations]);

  return (
    <>
      <div className="box-bottom-search background-card">
        {category == "bulanan" && (
          <div className="item-search">
            <label className="text-sm-bold neutral-500">{"Durasi"}</label>
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                as="div"
                className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
                aria-expanded="false"
              >
                {durasi}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu">
                {durasiList.map((location) => (
                  <Dropdown.Item
                    key={location}
                    onClick={() => setDurasi(location)}
                  >
                    {location}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {category != "bulanan" && (
          <div className="item-search">
            <label className="text-sm-bold neutral-500">
              {category != "harian" ? "Keberangkatan" : "Penjemputan"}
            </label>
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                as="div"
                className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
                aria-expanded="false"
              >
                {pickUpLocation}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu">
                {pickUpLocations.map((location) => (
                  <Dropdown.Item
                    key={location}
                    onClick={() => setPickUpLocation(location)}
                  >
                    {location}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {category != "harian" && category != "bulanan" && (
          <div className="item-search item-search-2">
            <label className="text-sm-bold neutral-500">Tujuan</label>
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                as="div"
                className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
              >
                {dropOffLocation}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu">
                {dropOffLocations.map((location) => (
                  <Dropdown.Item
                    key={location}
                    onClick={() => setDropOffLocation(location)}
                  >
                    {location}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        <div className="item-search item-search-3">
          <label className="text-sm-bold neutral-500">
            {category == "antar-kota" ? "Berangkat" : "Dari Tanggal"}
          </label>
          <div className="box-calendar-date">
            {/* <MyDatePicker /> */}
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
  value={getYear(date)}
  onChange={({ target: { value } }) => changeYear(Number(value))}
>
  {years.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

<select
  value={months[Number(getMonth(date)) - 1]}
  onChange={({ target: { value } }) =>
    changeMonth(months.indexOf(value))
  }
>
  {months.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              minDate={new Date()}
              selected={isShuttle ? startDateShuttle : startDateRent}
              onChange={(date) =>
                isShuttle ? setStartDateShuttle(date) : setStartDateRent(date)
              }
              selectsStart
              todayButton="Hari ini"
              dateFormat="dd/MM/yyyy"
              startDate={isShuttle ? startDateShuttle : startDateRent}
              endDate={isShuttle ? endDateShuttle : endDateRent}
            />
          </div>
        </div>

        {category != "antar-kota" && category != "bulanan" && (
          <div className="item-search item-search-3">
            <label className="text-sm-bold neutral-500">Sampai Tanggal</label>
            <div className="box-calendar-date">
              {/* <MyDatePicker /> */}
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date) - 1]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={isShuttle ? endDateShuttle : endDateRent}
                onChange={(date) =>
                  isShuttle ? setEndDateShuttle(date) : setEndDateRent(date)
                }
                maxDate={
                  isShuttle
                    ? moment(startDateShuttle).add(9, "days").toDate()
                    : moment(startDateRent).add(9, "days").toDate()
                }
                selectsEnd
                todayButton="Hari ini"
                dateFormat="dd/MM/yyyy"
                startDate={isShuttle ? startDateShuttle : startDateRent}
                endDate={isShuttle ? endDateShuttle : endDateRent}
                minDate={isShuttle ? startDateShuttle : startDateRent}
              />
            </div>
          </div>
        )}
        {isShuttle && (
          <div className="item-people-used">
            <label className="text-sm-bold neutral-500">Penumpang</label>
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                as="div"
                className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
              >
                {passengerType}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu">
                <Dropdown.Item onClick={() => setPassengerType("Warga")}>
                  Warga
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPassengerType("Non Warga")}>
                  Non Warga
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        <div className="item-search bd-none d-flex justify-content-end">
          <Link href={"/cars-list-1?category=" + category}>
            <button className="btn btn-brand-2 text-nowrap">
              <svg
                className="me-2"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white">Cari</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
