import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useState } from "react";
import '../style/ticket-details.css';

const SaleDetails = ({ url }) => {
    const { id } = useParams();
    const { data: sale, error, isPending } = useFetch(`${url}/${id}`);
    const [rating, setRating] = useState(0);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem("access_token"); 

    const handleRating = async () => {

        const requestData = {
            buyer: sale.buyer,
            owner: sale.owner,
            rating: rating
        };

        try {
            const response = await fetch(`${backendUrl}/api/users/rate`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
    
            if (response.ok) {
                alert('Rating submitted successfully!');
            } else {
                alert('Failed to submit rating!');
            }
        } catch (error) {
            console.error('Error occurred while submitting rating:', error);
            alert('An error occurred while submitting the rating.');
        }
    };

    return (
        <div className="ticket-details">
            {isPending && <div>Učitavam...</div>}
            {error && <div>Greška: {error}</div>}
            {sale ? (
                <div className="ticket-content">
                    <h2>{sale.eventName}</h2>
                    <div className="ticket-info">
                        <br />
                        <p>
                            <span>Mjesto:</span> <span className="answer">{sale.location}</span> |
                            <span> Datum:</span> <span className="answer">{sale.eventDate.split('T')[0]}</span> |
                            <span> Vrsta ulaznice:</span> <span className="answer">{sale.ticketType !== null ? sale.ticketType : "-"}</span> |
                            <span> Status:</span> <span className="answer">{sale.exchangeAvailable ? "Prodano" : "U prodaji"}</span> |
                            <span> Cijena:</span> <span className="answer">{sale.price} €</span> |
                            <span> Vrsta događaja:</span> <span className="answer">{sale.eventTypeId.nazVrDog}</span> |
                            <span> Broj sjedala:</span> <span className="answer">{sale.seatNumber !== null ? sale.seatNumber : "-"}</span> 
                        </p>
                        <br />
                        <p className="ticket-posted-by">
                            Objavio: {sale.owner.imeKor} {sale.owner.prezimeKor}
                        </p>
                        <br />
                        <p className="ticket-posted-by">
                            Email: {sale.owner.email}
                        </p>
                        <br />
                        <div className="ticket-rating">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span 
                                        key={star} 
                                        className={`star ${star <= rating ? 'selected' : ''}`}
                                        onClick={() => setRating(star)}
                                        style={{ cursor: 'pointer', fontSize: '24px', color: star <= rating ? 'purple' : 'gray' }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <button onClick={handleRating}>Submit Rating</button>
                        </div>
                    </div>
                </div>
            ) : ( <div>Sale not found.</div>)
            }
        </div>
    );
}

export default SaleDetails;
