import React, { useEffect, useState } from "react";
import '../style/SearchBar.css'

const SearchBar = ({ setResult }) => {
  const [data, setData] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [performers, setPerformers] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(null); 
  const [selectedValue, setSelectedValue] = useState(null); 
  
  const ID = localStorage.getItem("userID");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${backendUrl}/api/tickets`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
    
    fetch(`${backendUrl}/api/vrsta-dogadaja`)
      .then(response => response.json())
      .then(data => setEventTypes(data))
      .catch(error => console.error('Error fetching event types:', error));

    fetch(`${backendUrl}/api/tickets`)
      .then(response => response.json())
      .then(data => {
        const uniqueLocations = [...new Set(data.map(item => item.location))];
        setLocations(uniqueLocations);
      })
      .catch(error => console.error('Error fetching locations:', error));
 
    fetch(`${backendUrl}/api/tickets`)
      .then(response => response.json())
      .then(data => {
        const uniquePerformers = [...new Set(data.map(item => item.artistName).filter(performer => performer !== null))];
        setPerformers(uniquePerformers);
      })
      .catch(error => console.error('Error fetching performers:', error));
}, [backendUrl]);


  const [input, setInput] = useState("");

  const fetchData = (value) => {
    if (value === "") {
      setResult([]);
      return;
    }

    if (data) {
      const results = data.filter((item) =>
        item.owner.id !== parseInt(ID) &&
        ["u prodaji", "aukcija", "razmjena"].includes(item.isExchangeAvailable) &&
        (
          item.eventName?.toLowerCase().includes(value.toLowerCase()) ||
          item.ticketType?.toLowerCase().includes(value.toLowerCase()) ||
          item.location?.toLowerCase().includes(value.toLowerCase())
        )
      );
      setResult(results);
      console.log(results);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleFilterChange = (filterType, value) => {
    let filteredResults = data;

    if (filterType === "eventType") {
      filteredResults = filteredResults.filter(item => item.eventTypeId.nazVrDog === value);
    } else if (filterType === "location") {
      filteredResults = filteredResults.filter(item => item.location === value);
    } else if (filterType === "performer") {
      filteredResults = filteredResults.filter(item => item.artistName === value);
    } else if (filterType === "date") {
      const today = new Date();
      let dateFilter = [];

      if (value === "today") {
        dateFilter = filteredResults.filter(item => new Date(item.eventDate).toDateString() === today.toDateString());
      } else if (value === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateFilter = filteredResults.filter(item => new Date(item.eventDate).toDateString() === tomorrow.toDateString());
      } else if (value === "thisWeekend") {
        const weekendStart = new Date();
        weekendStart.setDate(weekendStart.getDate() + (5 - weekendStart.getDay()));
        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendEnd.getDate() + 2);
        dateFilter = filteredResults.filter(item => {
          const itemDate = new Date(item.eventDate);
          return itemDate >= weekendStart && itemDate <= weekendEnd;
        });
      }

      filteredResults = dateFilter;
    }

    setResult(filteredResults);
  };

  const handleSelectFilter = (filterType) => {
    setSelectedFilter(filterType);
    setSelectedValue(null); 
  };

  return (
    <div className="searchArea">
      <div className="searchBar">
        <img src="./images/search-svgrepo-com.svg" alt="magnifierGlass" className="searchIcon" />
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Pretraži događaje"
          className="searchInput"
        />
      </div>

      <div className="filters">
        <div className="filterButtons">
          <button onClick={() => handleSelectFilter('eventType')} className="filterBtn">Vrsta događaja</button>
          <button onClick={() => handleSelectFilter('location')} className="filterBtn">Lokacija</button>
          <button onClick={() => handleSelectFilter('date')} className="filterBtn">Datum</button>
          {performers.length > 0 && (
            <button onClick={() => handleSelectFilter('performer')} className="filterBtn">Izvođač</button>
          )}
        </div>

        {selectedFilter && (
          <div className="filterOptions">
            {selectedFilter === 'eventType' && eventTypes.map((eventType, index) => (
              <button key={index} onClick={() => handleFilterChange('eventType', eventType.nazVrDog)} className="optionBtn">
                {eventType.nazVrDog}
              </button>
            ))}
            {selectedFilter === 'location' && locations.map((location, index) => (
              <button key={index} onClick={() => handleFilterChange('location', location)} className="optionBtn">
                {location}
              </button>
            ))}
            {selectedFilter === 'performer' && performers.map((performer, index) => (
              <button key={index} onClick={() => handleFilterChange('performer', performer)} className="optionBtn">
                {performer}
              </button>
            ))}
            {selectedFilter === 'date' && (
              <>
                <button onClick={() => handleFilterChange('date', 'today')} className="optionBtn">Danas</button>
                <button onClick={() => handleFilterChange('date', 'tomorrow')} className="optionBtn">Sutra</button>
                <button onClick={() => handleFilterChange('date', 'thisWeekend')} className="optionBtn">Ovaj vikend</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;