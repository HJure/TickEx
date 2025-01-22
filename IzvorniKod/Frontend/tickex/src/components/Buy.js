import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import "../style/Buy.css";

function Buy() {
  const [results, setResult] = useState([]);

  const filterResultsByStatus = (results) => {
    return results.filter((item) => item.isExchangeAvailable === "u prodaji");
  };

  const filteredResults = filterResultsByStatus(results);

  return (
    <div className="saleList">
      <h2>Pretraga prodaja</h2>
      <SearchBar setResult={setResult} />
      <SearchResultsList results={filteredResults} />
    </div>
  );
}

export default Buy;
