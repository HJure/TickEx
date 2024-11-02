import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../style/ticket-details.css';

const TicketDetails = ({ url }) => {
    const { id } = useParams();
    const { data: ticket, error, isPending } = useFetch(`${url}/${id}`);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        const deleteUrl = `${url}/${id}`.replace(/([^:]\/)\/+/g, "$1"); 
    
        fetch(deleteUrl, {
            method: 'DELETE'
        }).then(() => {
            const trash = { 
                title: ticket.title, 
                author: ticket.author, 
                genre: ticket.genre, 
                event_picture: ticket.event_picture, 
                id: ticket.id 
            };
            
            fetch('http://localhost:5000/trash', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trash)
            }).then(() => {
                navigate('/profile');
            });
        });
    };
    
    return (
        <div className="ticket-details">
            {isPending && <div>Loading...</div>}
            {isDeleting && <div>Deleting ticket...</div>}
            {error && <div>Error: {error}</div>}
            {ticket && (
                <div className="ticket-content">
                    <h2>{ticket.nazDog}</h2>
                    <div className="ticket-info">
                        <img src={ticket.event_picture} alt={ticket.nazDog} className="ticket-image" />
                        <br/>
                        <p>
                            <span>Mjesto:</span> <span className="answer">{ticket.mjesto}</span> |
                            <span> Datum:</span> <span className="answer">{ticket.datum}</span> |
                            <span> Vrsta ulaznice:</span> <span className="answer">{ticket.vrsUla}</span> |
                            <span> Status:</span> <span className="answer">{ticket.status ? "u prodaji" : "prodano"}</span> |
                            <span> Cijena:</span> <span className="answer">{ticket.cijena} €</span> |
                            <span> ID događaja:</span> <span className="answer">{ticket.idDog}</span> |
                            <span> ID oglasa:</span> <span className="answer">{ticket.idOgl}</span>
                        </p>
                        <br/>
                        <p className="ticket-posted-by">Objavio: {ticket.idProdavac}</p>
                    </div>
                    <button onClick={handleDelete} className="delete-button">Obriši kartu</button>
                </div>
            )}
        </div>
    );
}

export default TicketDetails;
