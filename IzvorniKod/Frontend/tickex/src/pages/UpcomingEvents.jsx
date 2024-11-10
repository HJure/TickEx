import React, { useState, useEffect } from 'react';
import useFetch from '../components/useFetch';
import '../style/UpcomingEvents.css';

function UpcomingEvents() {
    const [Tickets, setTickets] = useState([]);
    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8080/api/tickets");

    useEffect(() => {if (tickets) {
        setTickets(tickets);
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
                        Tickets.map((ticket) => {
                            return (
                                <button key={ticket.id} className="moreInfoBtn">
                                    <div className="card">
                                        <h1>{ticket.eventName}</h1>
                                        <h4>{ticket.location}</h4>
                                        <h2>{formatDate(ticket.eventDate)}</h2>
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default UpcomingEvents;
