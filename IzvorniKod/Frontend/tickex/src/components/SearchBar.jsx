import React, { useEffect, useState } from "react";
import '../style/SearchBar.css'

const SearchBar = ({ setResult }) => {
  const [data, setData] = useState(null);
  const ID = localStorage.getItem("userID");

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [input, setInput] = useState("");

  const fetchData = (value) => {
    if (data) {
      const results = data.filter((item) =>
        (item.eventName?.toLowerCase().includes(value.toLowerCase()) ||
        item.ticketType?.toLowerCase().includes(value.toLowerCase()) ||
        item.location?.toLowerCase().includes(value.toLowerCase()) && item.owner.id !== ID)
      );
      setResult(results);
      console.log(results);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="searchArea">
      <div className="searchBar">
        <img src="./images/search-svgrepo-com.svg" alt="magnifierGlass"></img>
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Pretraži događaje"
        />
      </div>
    </div>
  );
};

export default SearchBar;
