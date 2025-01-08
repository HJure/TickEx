import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";


function Buy() {
  const [results, setResult] = useState([]);

  return (
    <div className="BuySiteDefault">
      <SearchBar setResult={setResult} />
      <SearchResultsList results={results} />
    </div>
  );
}

export default Buy;
