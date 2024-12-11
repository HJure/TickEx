import React from 'react';
import '../style/SearchResultsList.css'


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
          <form
          key={result.id}
          method="POST"
          action={`http://localhost:8080/shop`}
        >
          <div className="result-item">
            <h4>{result.eventName}</h4>
            <span>Mjesto: {result.location}</span> |
            <span> Datum: {result.eventDate.split('T')[0]}</span> |
            <span> Vrsta ulaznice: {result.ticketType}</span> |
            <span> Status:</span>{' '}
            <span className="answer">
              {result.exchangeAvailable ? 'Prodano' : 'U prodaji'}
            </span>{' '} |
            <span> Cijena: {result.price} EUR</span> |
            <span> Vrsta događaja:</span>{' '}
            <span className="answer">{result.eventTypeId.nazVrDog}</span> |
            <span> Broj sjedala:</span>{' '}
            <span className="answer">{result.seatNumber !== null ? result.seatNumber : '-'}</span>
            <br />
            <br />
            <input type="hidden" name="id" value={result.id} />
            <button type="submit" className="btn-buy">Kupi</button>
          </div>
        </form>
        ))}
      </div>
    </>
  );
};

export default SearchResultsList;
