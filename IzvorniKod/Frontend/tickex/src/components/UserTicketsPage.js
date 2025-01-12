import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


const UserTicketsPage = () => {
    const { userId } = useParams();  // Correct usage of useParams
    const [tickets, setTickets] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/users/${userId}/tickets`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Error while fetching tickets');
                }

                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [backendUrl, access_token, userId]);

    return (
        <div>
            <div>
                <h2 style={{ textAlign: 'center' }}>Tickets for User {userId}</h2>
            </div>
            {tickets.length > 0 ? (
                <div>
                    {tickets.map((ticket) => (
                        <div className="ticket-preview" key={ticket.id}>   
                            <Link to={ `/tickets/${ticket.id}` }>
                                <div className='eventType'>
                                    <h1>{ ticket.isExchangeAvailable }</h1>
                                </div>
                                <div className='eventInfo'>
                                    <h2>{ ticket.eventName }</h2>
                                    <h3>{ticket.eventDate}</h3>
                                    <h3>{ticket.location}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#fff', textAlign: 'center' }}>No tickets found for this user.</p>
            )}
        </div>
    );
};

export default UserTicketsPage;
