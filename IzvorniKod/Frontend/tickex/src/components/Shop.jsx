import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

function Shop() {
  const [results, setResult] = useState([]);

  return (
    <div className="shopSiteDefault">
      <SearchBar setResult={setResult} />
      <SearchResultsList results={results} />
    </div>
  );
}

export default Shop;
