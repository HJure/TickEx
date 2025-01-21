import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../style/UserTicketsPage.css';
import '../style/profile.css';

const UserTicketsPage = () => {
    const { userId } = useParams();  // Correct usage of useParams
    const [tickets, setTickets] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOcjena, setUserOcjena] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const [isDeactivated, setIsDeactivated] = useState(false);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`${backendUrl}/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUserName(userData.imeKor);
                    setUserEmail(userData.email);
                    setUserOcjena(userData.ocjena);
                } else {
                    throw new Error('Error while fetching user data');
                }

                const ticketsResponse = await fetch(`${backendUrl}/api/users/${userId}/tickets`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!ticketsResponse.ok) {
                    throw new Error('Error while fetching tickets');
                }

                const ticketsData = await ticketsResponse.json();
                setTickets(ticketsData);

                const deactivationResponse = await fetch(`${backendUrl}/api/deaktivira/is-deactivated/${userId}`, 
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (deactivationResponse.ok) {
                    const deactivations = await deactivationResponse.json();
                    setIsDeactivated(deactivations);
                } else {
                    throw new Error('Error while checking user deactivation status');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        
    };
        

        fetchUserData();
    }, [backendUrl, access_token, userId]);

    
    const deactivateUser = async () => {
        if (window.confirm("Are you sure you want to deactivate this profile? This action cannot be undone.")) {
            try {
                const currentUserId = localStorage.getItem('userID');
    
                const response = await fetch(`${backendUrl}/api/deaktivira`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        deaktiviraIdKor: currentUserId,
                        deaktiviranIdKor: userId,
                    }),
                });
    
                if (!response.ok) {
                    // Try to parse the response body for details
                    const errorDetails = await response.text(); // Use .text() or .json() depending on the backend response format
                    throw new Error(`Error while deactivating user: ${response.status} - ${response.statusText}\nDetails: ${errorDetails}`);
                }
    
                alert('User profile deactivated successfully.');
                navigate(`/user/${userId}/tickets`); // Redirect to home or another page
            } catch (error) {
                console.error(error);
            }
        }
    };

    const reactivateUser = async () => {
        if (window.confirm("Are you sure you want to reactivate this profile?")) {
            try {
                const response = await fetch(`${backendUrl}/api/deaktivira/user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Error while reactivating user');
                }
    
                alert('User profile reactivated successfully.');
                setIsDeactivated(false);
                navigate(`/user/${userId}/tickets`);
            } catch (error) {
                console.error('Error reactivating user:', error);
            }
        }
    };
    
    
    

    const deleteTicket = async (ticketId) => {
        if (window.confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
            try {
                const response = await fetch(`${backendUrl}/api/tickets/${ticketId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error while deleting ticket');
                }

                setTickets(tickets.filter(ticket => ticket.id !== ticketId)); // Update the state to remove the ticket
                alert('Ticket deleted successfully.');
            } catch (error) {
                console.error('Error deleting ticket:', error);
            }
        }
    };

    return (
        <div className="user-tickets-page">
            {/* User Profile Section */}
            <div>
                <h2 className="profile-title">Profil - {userName || userId}</h2>
                <div className="profile-container">
                    <p className="profile-info">Email adresa: {userEmail}</p>
                    <p className="profile-info">
                        Ocjena: {userOcjena}
                    </p>
                    <div>
                        {isDeactivated ? (
                            <button 
                                className="reactivate-profile-button"
                                onClick={reactivateUser}
                            >
                                Reactivate Profile
                            </button>
                        ) : (
                            <button 
                                className="delete-profile-button"
                                onClick={deactivateUser}
                            >
                                Deactivate Profile
                            </button>
                        )}
                    </div>

                </div>
            </div>
            {/* Tickets Section */}
            <div>
                <h2 className="tickets-title">Oglasi - {userName || `User ${userId}`}</h2>
                {tickets.length > 0 ? (
                    <div class="ticket-list">
                        {tickets.map((ticket) => (
                            <div className="ticket-preview" key={ticket.id}>   
                                <Link to={`/tickets/${ticket.id}`}>
                                    <div className="event-type">
                                        <h1>{ticket.isExchangeAvailable}</h1>
                                    </div>
                                    <div className="event-info">
                                        <h2>{ticket.eventName}</h2>
                                        <h3>{ticket.eventDate}</h3>
                                        <h3>{ticket.location}</h3>
                                    </div>
                                </Link>
                                <button 
                                    className="delete-ticket-button"
                                    onClick={() => deleteTicket(ticket.id)}
                                >
                                    Delete Ticket
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-tickets-message">No tickets found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default UserTicketsPage;
