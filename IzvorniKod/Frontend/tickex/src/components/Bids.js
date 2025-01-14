import { useState, useEffect } from "react";
import '../style/Bids.css';

const Bids = () => {
    const [bids, setBids] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

    useEffect(() => {
        fetch(`${backendUrl}/api/bids`)
          .then((response) => response.json())
          .then(data => {
            setBids(data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, [backendUrl]);

    return(
        <>
        <div className="bidContainer">
            <div className="standingOffers">
                <h1>Trenutne ponude</h1>
            </div>
            {bids.map( (bid) => (
                <div className="bid">
                    <h2>{bid.user}: </h2>
                    <h3>{bid.offer} EUR</h3>
                </div>
            ))}
        </div>
        <div className="personalOffer">
            <h2>Napravite svoju ponudu:</h2>
            <form>
                
            </form>
        </div>
        </>
    );
}
export default Bids;