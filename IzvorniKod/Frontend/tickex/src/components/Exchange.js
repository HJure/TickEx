import React, { useEffect, useState } from "react";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${backendUrl}/api/exchanges`)
      .then(response => response.json())
      .then(data => {
        setExchanges(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching exchanges.');
        setLoading(false);
      });
  }, [backendUrl, setLoading]);

  return (
    <div className="exchangeList">
      <h2>Exchange List</h2>
      <ul>
        {exchanges.map((exchange) => (
          <li key={exchange.id}>
            <div>
              <p><strong>Event:</strong> {exchange.eventName}</p>
              <p><strong>Location:</strong> {exchange.location}</p>
              <p><strong>Status:</strong> {exchange.isExchangeAvailable}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exchange;