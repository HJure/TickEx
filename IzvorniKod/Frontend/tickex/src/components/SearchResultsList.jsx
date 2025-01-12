import React from 'react';
import '../style/SearchResultsList.css';
import { handleBuyClick } from '../utils/buyButton.js';
import { useNavigate } from 'react-router-dom';

const handleAcceptExchange = (result) => {
  console.log("Prihvati razmjenu za ulaznicu: ", result);
  // funkcionalnost za prihvat razmjene
};

const handleReportClick = async (result, navigate) => {
  try {
      navigate('/reports', { state: { result } });
  } catch (error) {
      console.error("Error navigating to reports:", error);
  }
};

const handleGoToAuction = (result) => {
  console.log("Idi u aukciju za ulaznicu: ", result);
  // funkcionalnost za odlazak na aukciju
};

const SearchResultsList = ({ results }) => {
  const navigate = useNavigate();

  if (!Array.isArray(results)) {
    console.error("array doesn't exist");
    return null;
  }

  return (
    <div className="results-list">
      {results.map((result) => (
        <div key={result.id} className="result-item">
          <div className="status">{result.isExchangeAvailable}</div>
          
          <h4>{result.eventName}</h4>
          <span>Mjesto: {result.location}</span> |
          <span> Datum: {result.eventDate.split('T')[0]}</span> |
          <span> Vrsta ulaznice: {result.ticketType !== null ? result.ticketType : "-"}</span> |
          {result.isExchangeAvailable !== "razmjena" && <><span> Cijena: {result.price} EUR</span> |</>} 
          <span> Vrsta događaja:</span>{' '}
          <span className="answer">{result.eventTypeId.nazVrDog}</span> |
          <span> Broj sjedala:</span>{' '}
          <span className="answer">
            {result.seatNumber !== null ? result.seatNumber : '-'}
          </span>
          <br />
          <br />
          
          {result.isExchangeAvailable === "u prodaji" && (
            <button className="btn-buy" onClick={() => handleBuyClick(result)}>
              Kupi
            </button>
          )}

          {result.isExchangeAvailable === "razmjena" && (
            <button className="btn-buy" onClick={() => handleAcceptExchange(result)}>
              Prihvati
            </button>
          )}

          {result.isExchangeAvailable === "aukcija" && (
            <button className="btn-buy" onClick={() => handleGoToAuction(result)}>
              Idi u aukciju
            </button>
          )}
          <button className="btn-buy" onClick={() => handleReportClick(result, navigate)}>
              Prijavi
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
