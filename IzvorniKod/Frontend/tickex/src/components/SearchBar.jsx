import React, { useEffect, useState } from "react";
import "../style/SearchBar.css";

const SearchBar = ({ setResult }) => {
  const [data, setData] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const ID = localStorage.getItem("userID");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    fetch(`${backendUrl}/api/tickets`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const uniqueLocations = [...new Set(data.map((item) => item.location))];
        setLocations(uniqueLocations);

        const uniquePerformers = [
          ...new Set(
            data
              .map((item) => item.artistName)
              .filter((performer) => performer !== null)
          ),
        ];
        setPerformers(uniquePerformers);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(`${backendUrl}/api/vrsta-dogadaja`)
      .then((response) => response.json())
      .then((data) => setEventTypes(data))
      .catch((error) => console.error("Error fetching event types:", error));
  }, [backendUrl]);

  const [input, setInput] = useState("");

  const fetchData = (value, date = null) => {
    if (!data || (value === "" && !date)) {
      setResult([]);
      return;
    }

    const lowercasedValue = value.toLowerCase();

    let filteredResults = data.filter((item) => item.owner.id !== parseInt(ID));
    if (selectedFilter === "location") {
      filteredResults = filteredResults.filter((item) =>
        item.location?.toLowerCase().includes(lowercasedValue)
      );
    } else if (selectedFilter === "eventType") {
      filteredResults = filteredResults.filter((item) =>
        item.eventTypeId?.nazVrDog?.toLowerCase().includes(lowercasedValue)
      );
    } else if (selectedFilter === "performer") {
      filteredResults = filteredResults.filter((item) =>
        item.artistName?.toLowerCase().includes(lowercasedValue)
      );
    } else if (selectedFilter === "date" && date) {
      filteredResults = filteredResults.filter((item) =>
        item.eventDate.split("T")[0] === date
      );
    } else {
      filteredResults = filteredResults.filter(
        (item) =>
          item.eventName?.toLowerCase().includes(lowercasedValue) ||
          item.location?.toLowerCase().includes(lowercasedValue) ||
          item.artistName?.toLowerCase().includes(lowercasedValue) ||
          item.eventDate.split("T")[0].includes(lowercasedValue)
      );
    }
    setResult(filteredResults);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDateSubmit = () => {
    if (selectedDate) {
      fetchData("", selectedDate);
    }
  };

  const handleSelectFilter = (filterType) => {
    setSelectedFilter(filterType === selectedFilter ? null : filterType);
    if (filterType !== "date") {
      setSelectedDate("");
    }
  };

  return (
    <div className="searchArea">
      <div className="searchBar">
        <img
          src="./images/search-svgrepo-com.svg"
          alt="magnifierGlass"
          className="searchIcon"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Pretraži događaje"
          className="searchInput"
          disabled={selectedFilter === "date"}
        />
        <img
          src="./images/filter.png"
          alt="filter"
          className={`filterIcon ${selectedFilter ? "activeFilter" : ""}`}
          onClick={() => handleSelectFilter(selectedFilter ? null : "filter")}
        />
      </div>

      {selectedFilter && (
        <div className="filters">
          <button
            onClick={() => handleSelectFilter("eventType")}
            className={`filterBtn ${
              selectedFilter === "eventType" ? "active" : ""
            }`}
          >
            Vrsta događaja
          </button>
          <button
            onClick={() => handleSelectFilter("location")}
            className={`filterBtn ${
              selectedFilter === "location" ? "active" : ""
            }`}
          >
            Lokacija
          </button>
          <button
            onClick={() => handleSelectFilter("performer")}
            className={`filterBtn ${
              selectedFilter === "performer" ? "active" : ""
            }`}
          >
            Izvođač
          </button>
          <button
            onClick={() => handleSelectFilter("date")}
            className={`filterBtn ${
              selectedFilter === "date" ? "active" : ""
            }`}
          >
            Datum
          </button>
        </div>
      )}

      {selectedFilter === "date" && (
        <div className="dateFilter">
          <label htmlFor="date">Odaberi datum:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <img
            src="./images/OK.png"
            alt="Submit"
            className="submitIcon"
            onClick={handleDateSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
