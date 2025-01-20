import React from 'react';
import '../style/SearchResultsList.css';
import { handleBuyClick } from '../utils/buyButton.js';
import { useNavigate, Link } from 'react-router-dom';


const handleReportClick = async (result, navigate) => {
  try {
    navigate('/reports', { state: { result } });
  } catch (error) {
    console.error("Error navigating to reports:", error);
  }
};

const handleGoToAuction = (result, navigate) => {
  console.log("Idi u aukciju za ulaznicu: ", result);
  navigate(`/bids`);
  
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
          <div className="buttonsTickets">
            {result.isExchangeAvailable === "u prodaji" && (
              <button className="btn-buy" onClick={() => handleBuyClick(result)}>
                Kupi
              </button>
            )}

            {result.isExchangeAvailable === "aukcija" && (
              <button className="btn-buy" onClick={() => handleGoToAuction(result, navigate)}>
                Idi u aukciju
              </button>
            )}

            <Link to={`/tickets/${result.id}`} className="btn-more-info">
              Više info
            </Link>
            
            <button className="btn-buy" onClick={() => handleReportClick(result, navigate)}>
              Prijavi
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
