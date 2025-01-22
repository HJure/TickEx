import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Bids.css';

const Bids = () => {
    const [input, setInput] = useState("");
    const [bids, setBids] = useState([]);
    const [startPrice, setStartPrice] = useState([]);
    const [isPending, setIsPending] = useState(false);
    //const [isOwner, setIsOwner] = useState(false);
    const [hasMadeBid, setHasMadeBid] = useState(false);
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
                    const currentUserID = parseInt(localStorage.getItem("userID"));
                
                    if (result.owner?.id === currentUserID) {
                        //setIsOwner(true);
                        setBids(data);
                    } else {
                        const userBids = data.filter((bid) => bid.user.id === currentUserID);
                        if (userBids.length !== 0){
                            setHasMadeBid(true);
                        }
                        setBids(userBids);
                    }
                } else if (data.bids) {
                    const currentUserID = parseInt(localStorage.getItem("userID"));
                
                    if (result.owner?.id === currentUserID) {
                        //setIsOwner(true);
                        setBids(data.bids);
                    } else {
                        const userBids = data.bids.filter((bid) => bid.user.id === currentUserID);
                        if (userBids.length !== 0){
                            setHasMadeBid(true);
                        }
                        setBids(userBids);
                    }
                } else {
                    console.error("Unexpected response format:", data);
                    setBids([]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [backendUrl, result]);
    

      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
    
        let bid = {
            user: { id: localStorage.getItem("userID") },
            auction: { id: result.id },
            offer: parseInt(input, 10),
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
                    <h2>{bid.user.imeKor} {bid.user.prezimeKor}: </h2>
                    <h2>{bid.offer} EUR</h2>
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
                <button className="submitBtn" onClick={(e) => {
                    if (input < startPrice){
                        const userConfirmed = window.confirm("Nije moguće staviti manju ponudu od početne cijene");
                        if (!userConfirmed) {
                            return;
                        }
                    }else if (hasMadeBid){
                        const userConfirmed = window.confirm("Nije moguće više od jednom poslati ponudu");
                        if (!userConfirmed) {
                            return;
                        }
                    }else{
                        handleSubmit(e)
                    }
                    }} disabled={isPending}>
                    {isPending ? "Šaljem..." : "Pošalji ponudu"}
                </button>
            </div>
        </div>
        </>
    );
}
export default Bids;