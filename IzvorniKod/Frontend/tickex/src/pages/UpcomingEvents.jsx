import React, { useState, useEffect } from 'react';
import useFetch from '../components/useFetch';
import '../style/UpcomingEvents.css';
import { Link } from 'react-router-dom';


function UpcomingEvents() {
    const [Tickets, setTickets] = useState([]);
    //const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8080/api/tickets");
    const { data: tickets} = useFetch("https://backend-3qyr.onrender.com/api/tickets");
    
    useEffect(() => {
        if (tickets) {
            const userID = localStorage.getItem("userID");

            if (userID) {
                const filteredTickets = tickets.filter(ticket => ticket.owner.id !== parseInt(userID));
                setTickets(filteredTickets);
            } else {
                setTickets(tickets);
            }
        }
    }, [tickets]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
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
