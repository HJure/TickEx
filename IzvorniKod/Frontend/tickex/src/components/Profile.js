import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import useFetch from './useFetch';
import axios from 'axios'; 
import TicketList from './TicketList'; 
import '../style/profile.css';
import { Link } from "react-router-dom";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState(null);
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");

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
            }).catch((err) => console.log(err));
        }
    }, [access_token]);

    useEffect(() => {
        const fetchUserID = async () => {
            if (email) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/getId?email=${email}`, {
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
    }, [email, access_token]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userID) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${userID}`, {
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
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUserData();
    }, [userID, access_token]);

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userID");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_first_name");
        localStorage.removeItem("user_last_name");
        localStorage.removeItem("user_registration_date");

        setProfile(null);
        navigate('/signup');
    };

    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8080/api/tickets");
    const filteredTickets = tickets ? tickets.filter(ticket => ticket.owner.id === parseInt(userID)) : [];

    return profile ? (
        <div className='profilediv'>
            <div className="profile-container">
                <img src={profile.picture} alt="user" className="profile-image" />
                <h3 className="profile-heading">User Logged In</h3>
                <p className="profile-info">Name: {profile.name}</p>
                <p className="profile-info">Email Address: {profile.email}</p>
                <button onClick={logOut} className="logout-button">Log out</button>
            </div>
            <div>
                {ticketsError && <div className='error'>{ticketsError}</div>}
                {isTicketsPending && <div className='loading'>Loading tickets...</div>}
                <div className="my_offers_trash_container">
                    <div className="my_offers">
                        {tickets && <TicketList tickets={filteredTickets} title="My offers:" />}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <Link to="/create" className="newBlog">Add New Blog</Link>
        </div>
    ) : (
        <p className="loading-text">Loading profile...</p>
    );
}

export default Profile;
