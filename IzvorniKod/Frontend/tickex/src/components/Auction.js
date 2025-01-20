import { Link } from 'react-router-dom';
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import "../style/Auction.css";


const Auction = () => {
  const [results, setResult] = useState([]);
  
    const filterResultsByStatus = (results) => {
      return results.filter((item) => item.isExchangeAvailable === "aukcija");
    };
  
    const filteredResults = filterResultsByStatus(results);  

    return (
        <>
       <div className="relink">
        <h3>Želite stvoriti vlastitu aukciju?</h3>
        <Link to="/create" className="button">Odvedi me!</Link>
       </div>
       <div className="auctionContainer">
            <SearchBar setResult={setResult} />
            <SearchResultsList results={filteredResults} />
       </div>
       </>
    );
}
export default Auction;
