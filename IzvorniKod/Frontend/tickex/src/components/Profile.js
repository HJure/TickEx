import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import axios from 'axios';
import TicketList from './TicketList';
//import SaleList from './SaleList';
import '../style/profile.css';
import StarRate from './StarRate'
import Sidebar from './Sidebar';
import Chains from './Chains';

function Profile({ profile, setProfile }) {
    const [email, setEmail] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isProfileReady, setIsProfileReady] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); 
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rating, setRating] = useState('');
    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
        const urlParams = new URLSearchParams(window.location.search);
        access_token = urlParams.get("access_token");
        if (access_token) {
            localStorage.setItem("access_token", access_token);
        }
    }

    const logOut = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userID");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_first_name");
        localStorage.removeItem("user_last_name");
        localStorage.removeItem("user_registration_date");
        localStorage.removeItem("user_rating");
        localStorage.removeItem("user_status");
    
        setProfile(null);
        navigate('/');
    }, [navigate, setProfile]);
    

    useEffect(() => {
        if (access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                setProfile(res.data);
                setEmail(res.data.email);
            }).catch((err) => {
                if (err.response && err.response.status === 401) {
                    console.log("Token might be expired or invalid. Logging out...");
                    logOut();
                } else {
                    console.error("Error fetching profile:", err);
                }
            });
        }
    }, [access_token, logOut, setProfile]);
    

    useEffect(() => {
        const fetchUserID = async () => {
            if (email) {
                try {
                    const response = await fetch(`${backendUrl}/api/users/getId?email=${email}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Error while fetching user ID');
                    }

                    const data = await response.json();
                    setUserID(data);
                    localStorage.setItem("userID", data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUserID();
    }, [email, access_token, backendUrl]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userID) {
                try {
                    const response = await fetch(`${backendUrl}/api/users/${userID}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`,
                        },
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Error while fetching user data');
                    }

                    const data = await response.json();
                    setFirstName(data.imeKor);
                    setLastName(data.prezimeKor);
                    setRating(data.ocjena !== 0.0 ? data.ocjena : "nema ocjenu");
                    localStorage.setItem("user_email", data.email);
                    localStorage.setItem("user_first_name", data.imeKor);
                    localStorage.setItem("user_last_name", data.prezimeKor);
                    localStorage.setItem("user_registration_date", data.datumUla);
                    localStorage.setItem("user_rating", data.ocjena);
                    localStorage.setItem("user_status", data.statusKor);
                    setIsProfileReady(true);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUserData();
    }, [userID, access_token, backendUrl]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [profile]);

    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch(`${backendUrl}/api/tickets`);
    const filteredTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID)
                                    && ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable)) : [];
    const purchasedTickets = tickets ? tickets.filter(ticket => ticket.buyer?.id === parseInt(userID)) : [];
    const deletedTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID)
                                    && ticket.isExchangeAvailable === "obrisano") : [];
    const expiredTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID)
                                    && ticket.isExchangeAvailable === "isteklo") : [];
    const likedTickets = tickets;
    const { data: chains } = useFetch(`${backendUrl}/api/chain/${userID}`);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            const numericRating = rating === "nema ocjenu" ? 0.0 : rating;
    
            const updatedUserData = {
                email: localStorage.getItem("user_email"),  
                imeKor: firstName,                         
                prezimeKor: lastName,                      
                datumUla: localStorage.getItem("user_registration_date"), 
                statusKor: true,                            
                ocjena: numericRating
            };
    
            const response = await fetch(`${backendUrl}/api/users/${userID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);  
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            setFirstName(data.imeKor);
            setLastName(data.prezimeKor);
    
            localStorage.setItem("user_first_name", data.imeKor);
            localStorage.setItem("user_last_name", data.prezimeKor);
    
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const renderTicketList = () => {
        switch (activeTab) {
            case 'myOffers':
                return <div className="my_offers" ><TicketList tickets={filteredTickets} isPending={isTicketsPending} error={ticketsError} /></div>;
            case 'purchased':
                return <div className="my_offers" ><TicketList tickets={purchasedTickets} isPending={isTicketsPending} error={ticketsError} /></div>;
            case 'deleted':
                return <div className="my_offers" ><TicketList tickets={deletedTickets} isPending={isTicketsPending} error={ticketsError} /></div>;
            case 'expired':
                return <div className="my_offers" ><TicketList tickets={expiredTickets} isPending={isTicketsPending} error={ticketsError} /></div>;
            case 'liked':
                return <div className="my_offers" ><TicketList tickets={likedTickets} isPending={isTicketsPending} error={ticketsError} /></div>;
            case 'exchangeChains':
                return (
                    <div className="exchange-chains">
                        <Chains chains={chains}/>
                    </div>
                );
            case 'profile':
                return (
                    <div className="profile-container">
                        <img src={profile.picture} alt="user" className="profile-image" />
                        <p className="profile-info">Ime: {localStorage.getItem("user_first_name")} {localStorage.getItem("user_last_name")}</p>
                        <p className="profile-info">Email adresa: {localStorage.getItem("user_email")}</p>
                        <p className="profile-info">
                            Ocjena: {localStorage.getItem("user_rating") === "0" ? (
                                <img src="/images/forbidden.png" alt="forbidden" className="rating-image" />
                            ) : localStorage.getItem("user_rating")}
                        </p>
                        <StarRate ocjena={localStorage.getItem("user_rating")} />
                        {isEditing ? (
                            <div>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <button onClick={handleSaveChanges}>Spremi promjene</button>
                                <button onClick={() => setIsEditing(false)}>Otkaži</button>
                            </div>
                        ) : (
                            <button onClick={handleEditProfile}>Uredi podatke!</button>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return isLoaded && profile && isProfileReady ? (
        <div className='profilediv'>
            <Sidebar className="bar" setActiveTab={setActiveTab} />
            <div className="profile-content">
                {ticketsError && <div className='error'>{ticketsError}</div>}
                {isTicketsPending && <div className='loading'>Učitavam ulaznice...</div>}
                {renderTicketList()}
            </div>
        </div>
    ) : (
        <p className="loading-text">Učitavam profil...</p>
    );
}

export default Profile;
