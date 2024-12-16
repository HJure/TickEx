import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/ticket-details.css';
import StarRate from "./StarRate";


const TicketDetails = ({ url }) => {
    const { id } = useParams();
    const { data: ticket, error, isPending } = useFetch(`${url}/${id}`);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const [canDelete, setCanDelete] = useState(false);
    const [canBringBack, setBringBack] = useState(false);

    // State for like button image
    const [likeImage, setLikeImage] = useState("../images/unlike.png");

    useEffect(() => {
        const userID = localStorage.getItem("userID"); 
        if (ticket && userID) {
            setCanDelete(ticket.owner.id === parseInt(userID) && ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable));
            setBringBack(ticket.owner.id === parseInt(userID) && ticket.isExchangeAvailable === "obrisano");
        }
    }, [ticket]);

    const handleDelete = () => {
        const deleteUrl = `${url}/${id}/status`.replace(/([^:]\/)\/+/g, "$1"); 
        const access_token = localStorage.getItem("access_token"); 
    
        fetch(deleteUrl, {
            method: 'PUT',
            headers: { 
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "obrisano" })
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

    const handleBack = () => {
        let newStatus = "u prodaji";
        if (ticket.price > 0) {
            newStatus = "u prodaji";
        } else if (ticket.wantedNameEvent) {
            newStatus = "razmjena";
        } else if (ticket.startPrice > 0) {
            newStatus = "aukcija";
        }
     
        const updateUrl = `${url}/${id}/status`.replace(/([^:]\/)\/+/g, "$1"); 
        const access_token = localStorage.getItem("access_token"); 
    
        fetch(updateUrl, {
            method: 'PUT',
            headers: { 
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(() => {
            console.log('Ticket status updated');
            setIsDeleting(true); 
            setTimeout(() => {
                navigate('/profile'); 
            }, 1500);
        })
        .catch(error => {
            console.error("Greška prilikom ažuriranja karte:", error);
            setIsDeleting(false);
        });
    };

    // Handle like button click
    const handleLikeClick = () => {
        setLikeImage(likeImage === "../images/unlike.png" ? "../images/like.png" : "../images/unlike.png");
    };

    return (
        <div className="ticket-details">
            {isPending && <div>Učitavam...</div>}
            {isDeleting && <div>Brišem kartu...</div>}
            {error && <div>Greška: {error}</div>}
            {ticket && (
                <div className="ticket-content">
                    <h2>
                        {ticket.eventName} 
                        <img 
                            className="like" 
                            src={likeImage} 
                            alt="like" 
                            onClick={handleLikeClick} // Add click event handler here
                        />
                    </h2>

                    <div className="ticket-info">
                        <br/>
                        <p>
                            <span>Mjesto:</span> <span className="answer">{ticket.location}</span> |
                            <span> Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span> |
                            <span> Vrsta ulaznice:</span> <span className="answer">{ticket.ticketType !== null ? ticket.ticketType : "-"}</span> |
                            <span> Status:</span> <span className="answer">{ticket.isExchangeAvailable}</span> |
                            <span> Cijena:</span> <span className="answer">{ticket.price} €</span> |
                            <span> Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span> |
                            <span> Broj sjedala:</span> <span className="answer">{ticket.seatNumber !== null ? ticket.seatNumber : "-"}</span>
                            <span> Izbrisana:</span> <span className="answer">{ticket.obrisanoTime !== null ? ticket.obrisanoTime : "-"}</span>
                        </p>
                        <br/>
                        <p className="ticket-posted-by">Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}</p>
                        <StarRate ocjena={ticket.owner.ocjena} />
                    </div>
                    {canDelete && <button onClick={handleDelete} className="delete-button">Obriši kartu</button>}
                    {canBringBack && <button onClick={handleBack} className="delete-button">Vrati</button>}
                </div>
            )}
        </div>
    );
}

export default TicketDetails;
