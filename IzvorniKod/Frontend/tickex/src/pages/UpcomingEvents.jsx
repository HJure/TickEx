import React, { useState, useEffect } from 'react';
import useFetch from '../components/useFetch';
import '../style/UpcomingEvents.css';
import { Link } from 'react-router-dom';


function UpcomingEvents() {
    const [Tickets, setTickets] = useState([]);
    //const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8080/api/tickets");
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const userID = localStorage.getItem("userID");

    const { data: tickets } = useFetch(userID 
        ? `${backendUrl}/api/tickets/nothidden/${userID}` 
        : `${backendUrl}/api/tickets`
    );
    
    useEffect(() => {
        if (tickets) {
            const userID = localStorage.getItem("userID");

            if (userID) {
                const filteredTickets = tickets.filter(ticket => ticket.owner.id !== parseInt(userID) &&
                ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable));
                setTickets(filteredTickets);
            } else {
                const filteredTickets = tickets.filter(ticket =>
                ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable));
                setTickets(filteredTickets);
            }
        }
    }, [tickets]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
    };

    const divImage = (nazVrgDog) => {
        if (nazVrgDog === "Kino"){
            return "../../images/Kino.png";
        }else if (nazVrgDog === "Kazaliste"){
            return "../../images/Kazaliste.png";
        }else if (nazVrgDog === "Nogomet"){
            return "../../images/Nogomet.png";
        }else if (nazVrgDog === "Tematski park"){
            return "../../images/Tematski_park.png";
        }else if (nazVrgDog === "Festival"){
            return "../../images/Festival.png";
        }else if (nazVrgDog === "Tenis"){
            return "../../images/Tenis.png";
        }else if (nazVrgDog === "Glazba"){
            return "../../images/Koncert.png"
        }
    };

    return (
        <>
            <div className="events-container">
                <h1>Nadolazeći događaji</h1>
                <div className="cards-container-box">
                    {
                        Tickets.map((ticket) => (
                            <Link to={`/tickets/${ticket.id}`} className='moreInfo' key={ticket.id}>
                                <div className="card">
                                    <div className='imageDiv'>
                                    <img src={divImage(ticket.eventTypeId.nazVrDog)} alt = {ticket.eventTypeId.nazVrDog}/>
                                    </div>
                                    <h1>{ticket.eventName}</h1>
                                    <h4>{ticket.location}</h4>
                                    <h4>{ticket.eventTypeId.nazVrDog}</h4>
                                    <h2>{formatDate(ticket.eventDate)}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default UpcomingEvents;
