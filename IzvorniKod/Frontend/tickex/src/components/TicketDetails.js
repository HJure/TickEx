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

        fetch(deleteUrl, {
            method: 'DELETE'
        }).then(() => {
            const trash = { 
                nazDog: ticket.nazDog, 
                mjesto: ticket.mjesto, 
                datum: ticket.datum, 
                brSj: ticket.brSj,
                vrsDog: ticket.vrsDog,
                vrsUla: ticket.vrsUla,
                status: ticket.status,
                cijena: ticket.cijena,
                idProdavac: ticket.idProdavac,
                idDog: ticket.idDog, 
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
                        <br/>
                        <p>
                            <span>Mjesto:</span> <span className="answer">{ticket.mjesto}</span> |
                            <span> Datum:</span> <span className="answer">{ticket.datum}</span> |
                            <span> Vrsta ulaznice:</span> <span className="answer">{ticket.vrsUla}</span> |
                            <span> Status:</span> <span className="answer">{ticket.status ? "u prodaji" : "prodano"}</span> |
                            <span> Cijena:</span> <span className="answer">{ticket.cijena} €</span> |
                            <span> ID događaja:</span> <span className="answer">{ticket.idDog}</span> |
                            <span> ID oglasa:</span> <span className="answer">{ticket.id}</span>
                        </p>
                        <br/>
                        <p className="ticket-posted-by">Objavio: {ticket.idProdavac}</p>
                    </div>
                    {ima && <button onClick={handleDelete} className="delete-button">Obriši kartu</button>}
                </div>
            )}
        </div>
    );
}

export default TicketDetails;
