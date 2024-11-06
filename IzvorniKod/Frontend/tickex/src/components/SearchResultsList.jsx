import React from 'react'
import '../style/SearchResultsList.css'

const SearchResultsList = ( {results} ) => {
    if (!Array.isArray(results)){
        console.error("array doesn't exist")
        return null;
    };
    console.log(results)
    return (
    <>
    <div className="results-list">
    {(
        results.map((result) => (
          <div key={result.id} className="result-item">
            <h4>{result.nazDog}</h4>
            <span>Mjesto: {result.mjesto}</span> |
            <span> Vrsta ulaznice: {result.vrsDog}</span> |
            <span> Datum: {result.datum}</span> |
            <span> Cijena: {result.cijena} EUR</span> |
            <span> ID događaja: {result.idDog}</span> |
            <span> ID oglasa: {result.id}</span>
          </div>
        ))
      )}
    </div>
    </>
  );
    };
export default SearchResultsList;