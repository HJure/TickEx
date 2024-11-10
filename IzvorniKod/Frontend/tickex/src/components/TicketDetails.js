import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/ticket-details.css';

const TicketDetails = ({ url }) => {
    const { id } = useParams();
    const { data: ticket, error, isPending } = useFetch(`${url}/${id}`);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const [ima, setIma] = useState(true);

    useEffect(() => {
        if (url === "http://localhost:5000/trash/") {
            setIma(false);
        }
    }, [url]);

    const handleDelete = () => {
        const deleteUrl = `${url}/${id}`.replace(/([^:]\/)\/+/g, "$1"); 
        const access_token = localStorage.getItem("access_token"); 
    
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: { 
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(() => {
            console.log('Ticket deleted');
            setIsDeleting(true); 
            setTimeout(() => {
                navigate('/profile'); 
            }, 1500);
        })
        .catch(error => {
            console.error("Greška prilikom brisanja karte:", error);
            setIsDeleting(false);
        });
    };
    

    return (
        <div className="ticket-details">
            {isPending && <div>Učitavam...</div>}
            {isDeleting && <div>Brišem kartu...</div>}
            {error && <div>Greška: {error}</div>}
            {ticket && (
                <div className="ticket-content">
                    <h2>{ticket.eventName}</h2> 
                    <div className="ticket-info">
                        <br/>
                        <p>
                            <span>Mjesto:</span> <span className="answer">{ticket.location}</span> |
                            <span> Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span> |
                            <span> Vrsta ulaznice:</span> <span className="answer">{ticket.ticketType !== null ? ticket.ticketType : "-"}</span> |
                            <span> Status:</span> <span className="answer">{ticket.exchangeAvailable ? "Prodano" : "U prodaji"}</span> |
                            <span> Cijena:</span> <span className="answer">{ticket.price} €</span> |
                            <span> Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span> |
                            <span> Broj sjedala:</span> <span className="answer">{ticket.seatNumber !== null ? ticket.seatNumber : "-"}</span>
                        </p>
                        <br/>
                        <p className="ticket-posted-by">Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}</p>
                    </div>
                    {ima && <button onClick={handleDelete} className="delete-button">Obriši kartu</button>}
                </div>
            )}
        </div>
    );
}

export default TicketDetails;
