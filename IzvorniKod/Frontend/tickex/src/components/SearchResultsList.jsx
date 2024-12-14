import React from 'react';
import '../style/SearchResultsList.css'
import { handleBuyClick} from '../utils/buyButton.js'


const SearchResultsList = ({ results }) => {
  if (!Array.isArray(results)) {
    console.error("array doesn't exist");
    return null;
  }
  console.log(results);

  return (
    <>
      <div className="results-list">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h4>{result.eventName}</h4>
            <span>Mjesto: {result.location}</span> |
            <span> Datum: {result.eventDate.split('T')[0]}</span> |
            <span> Vrsta ulaznice: {result.ticketType}</span> |
            <span> Status:</span>{' '}
            <span className="answer">
              {result.exchangeAvailable ? 'Prodano' : 'U prodaji'}
            </span>{' '}
            |
            <span> Cijena: {result.price} EUR</span> |
            <span> Vrsta događaja:</span>{' '}
            <span className="answer">{result.eventTypeId.nazVrDog}</span> |
            <span> Broj sjedala:</span>{' '}
            <span className="answer">
              {result.seatNumber !== null ? result.seatNumber : '-'}
            </span>
            <br />
            <br />
            <button className="btn-buy" onClick={() =>
                  handleBuyClick({
                  idOgl: result.idOgl,
                  cijena: result.cijena,
                  idKor: result.idKor,
                  kupujeidKor: result.kupujeidKor,
                  })
                }
            >
              Kupi
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResultsList;
