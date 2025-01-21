import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Bids.css';

const Bids = () => {
    const [input, setInput] = useState("");
    const [bids, setBids] = useState([]);
    const [startPrice, setStartPrice] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const location = useLocation();
    const result = location.state?.result;

    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        if (result?.startPrice) {
            setStartPrice(result.startPrice);
        }
    }, [result]);

    useEffect(() => {
        fetch(`${backendUrl}/api/auctions/bids/${result.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBids(data);
                    console.log(data);
                } else if (data.bids) {
                    setBids(data.bids);
                } else {
                    console.error("Unexpected response format:", data);
                    setBids([]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [backendUrl]);
    

      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
    
        let bid = {
            user: { id: localStorage.getItem("userID") },
            auction: { id: result.id },
            offer: parseInt(input),
            id: {id: result.id}
        }

        setIsPending(true);

        fetch(`${backendUrl}/api/auctions/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(bid),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Nemoguće poslati ponudu");
                }
                return response.json();
            })
            .then(() => {
                console.log("Nova ponuda!");
                navigate("/auctions");
            })
            .catch((error) => {
                console.error("Error:", error);
            })
            .finally(() => {
                setIsPending(false);
            });
    }

    return(
        <>
        <div className="standingOffers">
            <h1>Trenutne ponude</h1>
        </div>
        <div className="bidContainer">
            {bids.map( (bid) => (
                <div className="bid">
                    <h2>{bid.user.email}: </h2>
                    <h3>{bid.offer} EUR</h3>
                </div>
            ))}
        </div>
        <div className="personalOffer">
            <h2>Upišite vlastitu ponudu:</h2>
            <h3>Vaša ponuda ne može biti niža od početne cijene koja iznosi: {startPrice} EUR.</h3>
            <h3>U slučaju da je, ponudu neće biti moguće predati</h3>
            <div className="offer">
                <input
                    type="number"
                    step="1" 
                    min = {startPrice}
                    value={input}
                    placeholder="Upisati ponudu u eurima"
                    className="bidOffer"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="submitBtn" onClick={(e) => handleSubmit(e)} disabled={isPending}>
                    {isPending ? "Šaljem..." : "Pošalji ponudu"}
                </button>
            </div>
        </div>
        </>
    );
}
export default Bids;