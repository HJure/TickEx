import { useParams, useNavigate} from "react-router-dom"; 
import { useState, useEffect } from "react";
import '../style/ticket-details.css';

const SaleDetails = ({ url }) => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'GET',
                    headers: { 
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Ticket data fetched:', data);
                setTicket(data);
            } catch (err) {
                console.error("Error fetching ticket:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicket();
    }, [url, id, access_token]);

    const handleReportClick = async (ticket, navigate) => {
        try {
            navigate('/reports', { state: { ticket } });
        } catch (error) {
            console.error("Error navigating to reports:", error);
        }
      };

    const handleRating = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/users/rate/${rating}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ticket)
            });

            const isRated = await response.json();

            if (isRated) {
                alert("Rating submitted successfully!");
            } else {
                alert("You have already rated this user.");
            }
        } catch (error) {
            console.error("Error occurred while submitting rating:", error);
            alert("An error occurred while submitting the rating.");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ticket-details">
            <div className="ticket-info">
                <p>
                    <span>Mjesto:</span> <span className="answer">{ticket.location}</span> |
                    <span>Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span> |
                    <span>Vrsta ulaznice:</span> <span className="answer">{ticket.ticketType || "-"}</span> |
                    <span>Status:</span> <span className="answer">{ticket.isExchangeAvailable ? "Yes" : "No"}</span> |
                    <span>Cijena:</span> <span className="answer">{ticket.price} €</span> |
                    <span>Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span> |
                    <span>Broj sjedala:</span> <span className="answer">{ticket.seatNumber || "-"}</span>
                </p>
                <p className="ticket-posted-by">
                    Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}
                </p>
                <br/>
                <p className="ticket-posted-by">
                    Email: {ticket.owner.email}
                </p>
                <div className="ticket-rating">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star} 
                                className={`star ${star <= rating ? 'selected' : ''}`}
                                onClick={() => setRating(star)}
                                style={{ cursor: 'pointer', fontSize: '24px', color: star <= rating ? 'yellow' : 'lightgray' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button onClick={handleRating}>Submit Rating</button>
                    <button className="btn-buy" onClick={() => handleReportClick(ticket, navigate)}>
                        Prijavi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaleDetails;
