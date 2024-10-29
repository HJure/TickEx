import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
            const trash = { title: ticket.title, author: ticket.author, genre: ticket.genre, event_picture: ticket.event_picture, id: ticket.id };
            
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
                <div>
                    <h2>{ticket.title}</h2>
                    <h6>Genre: {ticket.genre}</h6>
                    <p>{'>>'} Posted by {ticket.author}</p>
                    <img src={ticket.event_picture} alt={ticket.title} />
                    <br/>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default TicketDetails;
