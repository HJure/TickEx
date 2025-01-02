import React, { useEffect, useState } from "react";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${backendUrl}/api/exchanges/`)
      .then(response => response.json())
      .then(data => {
        setExchanges(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching exchanges.');
        setLoading(false);
      });
  }, [backendUrl]);

  const handleProcessExchange = (id) => {
    fetch(`${backendUrl}/api/exchanges/${id}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Exchange chain processing failed.");
        }
      })
      .then(message => {
        alert(message);
        setExchanges(exchanges.filter(exchange => exchange.id !== id));
      })
      .catch(error => {
        console.error('Error processing exchange:', error);
        alert('Error processing exchange');
      });
  };

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
              <button onClick={() => handleProcessExchange(exchange.id)}>
                Process Exchange
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exchange;