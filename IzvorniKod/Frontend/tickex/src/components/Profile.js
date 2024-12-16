import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import axios from 'axios';
import TicketList from './TicketList';
import SaleList from './SaleList';
import '../style/profile.css';
import { Link } from "react-router-dom";
import StarRate from './StarRate';

function Profile({profile, setProfile}) {
    const [email, setEmail] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isProfileReady, setIsProfileReady] = useState(false); 
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

        setProfile(null);  
        navigate('/'); 
    }, [navigate]);

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
    }, [access_token, logOut]);

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
                    localStorage.setItem("user_email", data.email);
                    localStorage.setItem("user_first_name", data.imeKor);
                    localStorage.setItem("user_last_name", data.prezimeKor);
                    localStorage.setItem("user_registration_date", data.datumUla);
                    data.ocjena !== 0.0 ? localStorage.setItem("user_rating", data.ocjena) : localStorage.setItem("user_rating", "nema ocjenu");

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

    useEffect(() => {
        const fetchUserTickets = async () => {
            if (userID) {
                try {
                    const response = await fetch(`${backendUrl}/api/users/${userID}/tickets`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`,
                        },
                        credentials: 'include',
                    });
    
                    if (!response.ok) {
                        throw new Error('Error while fetching user tickets');
                    }
    
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
    
        fetchUserTickets();
    }, [userID, access_token, backendUrl]);

    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch(`${backendUrl}/api/tickets`);
    const { data: sales} = useFetch(`${backendUrl}/api/sales`);
    const filteredTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID) 
                                    && ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable)) : [];
    const purchasedTickets = Array.isArray(sales) ? sales.filter(sale => sale.buyer?.id === parseInt(userID)) : [];
    const deletedTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID) 
                                    && ticket.isExchangeAvailable === "obrisano") : [];
    const expiredTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID) 
                                    && ticket.isExchangeAvailable === "isteklo") : [];

    return isLoaded && profile && isProfileReady ? (
        <div className='profilediv'>
            <div className="profile-container">
                <img src={profile.picture} alt="user" className="profile-image" />
                <p className="profile-info">Ime: {localStorage.getItem("user_first_name")} {localStorage.getItem("user_last_name")}</p>
                <p className="profile-info">Email adresa: {localStorage.getItem("user_email")}</p>
                <p className="profile-info">Ocjena: {localStorage.getItem("user_rating")}</p>
                <StarRate ocjena={localStorage.getItem("user_rating")}/>
            </div>
            <div>
                {ticketsError && <div className='error'>{ticketsError}</div>}
                {isTicketsPending && <div className='loading'>Učitavam ulaznice...</div>}
                <div className="my_offers_trash_container">
                    <div className="my_offers">
                        {tickets && <TicketList tickets={filteredTickets} title="Moje ponude:" />}
                    </div>
                    <div className="my_offers">
                        {sales && <SaleList sales={purchasedTickets} title="Kupljeno:" />}
                    </div>
                    <div className="my_offers">
                        {tickets && <TicketList tickets={deletedTickets} title="Obrisano:" />}
                    </div>
                    <div className="my_offers">
                        {tickets && <TicketList tickets={expiredTickets} title="Isteklo:" />}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <Link to="/create" className="newBlog">Dodaj novu ulaznicu</Link>
        </div>
    ) : (
        <p className="loading-text">Učitavam profil...</p>
    );
}

export default Profile;
