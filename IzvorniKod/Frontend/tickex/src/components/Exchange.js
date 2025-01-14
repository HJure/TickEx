import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "../style/Exchange.css";

const Exchange = () => {
  const [results, setResult] = useState([]);

  const filterResultsByStatus = (results) => {
    return results.filter((item) => item.isExchangeAvailable === "razmjena");
  };
  
  const filteredResults = filterResultsByStatus(results);

  return (
    <div className="exchangeList">
      <h2>Pretraga razmjena</h2>
      <SearchBar setResult={setResult}/>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredResults.map((exchange) => (
          <li key={exchange.id}>
            <div className="ponudena">
              <h3>Ponuđena karta</h3>
              <p>
                <strong>Naziv događaja:</strong> {exchange.eventName}
              </p>
              <p>
                <strong>Datum događaja:</strong> {exchange.eventDate}
              </p>
              <p>
                <strong>Lokacija:</strong> {exchange.location}
              </p>
              {exchange.seatNumber && (
                <p>
                  <strong>Broj sjedala:</strong> {exchange.seatNumber}
                </p>
              )}
              {exchange.ticketType && (
                <p>
                  <strong>Tip karte:</strong> {exchange.ticketType}
                </p>
              )}
              <p>
                <strong>Vlasnik:</strong> {exchange.owner?.imeKor} {exchange.owner?.prezimeKor}
              </p>
            </div>
            <img src="/images/up-arrow.png" alt="Arrow" />
            <div className="trazeno">
              <h3>Tražena karta</h3>
              <p>
                <strong>Naziv događaja:</strong> {exchange.wantedEventName}
              </p>
              <p>
                <strong>Datum događaja:</strong> {exchange.wantedDate}
              </p>
              <p>
                <strong>Lokacija:</strong> {exchange.wantedLocation}
              </p>
              {exchange.wantedSeatNumber && (
                <p>
                  <strong>Broj sjedala:</strong> {exchange.wantedSeatNumber}
                </p>
              )}
              {exchange.wantedTicketType && (
                <p>
                  <strong>Tip karte:</strong> {exchange.wantedTicketType}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Exchange;
