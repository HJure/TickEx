import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SearchResultsList from "./SearchResultsList";
import '../style/Auction.css';

const Auction = () => {
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
      const ID = localStorage.getItem("userID");
    
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
      useEffect(() => {
          fetch(`${backendUrl}/api/auctions`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.isExchangeAvailable !== "istekao");
                const filteredData2 = filteredData.filter(item => item.owner.id !== parseInt(ID));
                setData(filteredData2);
                setOriginalData(filteredData2);
            }).catch(error => console.error('Error fetching data:', error));
        }, [backendUrl, ID]);
      
        const [input, setInput] = useState("");
        const fetchData = (value) => {
          if (value === "") {
            setData(originalData);
            return;
          }

          if (!originalData) return;
      
          if (originalData) {
            const results = originalData.filter((item) =>
              item.isExchangeAvailable !== "istekao" &&
              item.owner.id !== parseInt(ID) && 
              (
                item.eventName?.toLowerCase().includes(value.toLowerCase()) ||
                item.ticketType?.toLowerCase().includes(value.toLowerCase()) ||
                item.location?.toLowerCase().includes(value.toLowerCase())
              )
            );
            setData(results);
            console.log(results);
        };
      }
      
      
        const handleChange = (value) => {
          setInput(value);
          fetchData(value);
        };
    return (
        <>
       <div className="relink">
        <h3>Želite stvoriti vlastitu aukciju?</h3>
        <Link to="/create" className="button">Odvedi me!</Link>
       </div>
       <div className="auctionContainer">
            <div className="searchArea">
                <div className="searchBar">
                    <img src="./images/search-svgrepo-com.svg" alt="magnifierGlass"></img>
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="..."
                    />
                </div>
            </div>
            <SearchResultsList results={data} />
       </div>
       </>
    );
}
export default Auction;
