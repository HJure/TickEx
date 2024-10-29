import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import TicketList from './TicketList';
import useFetch from './useFetch';
import Trash from './Trash';

function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.access_token) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {setProfile(res.data); console.log(res.data);})
                .catch((err) => console.log(err));
        }
    }, []);

    const logOut = () => {
        googleLogout();
        localStorage.removeItem("user");
        setProfile(null);
        navigate('/signup');
    };

    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8000/tickets");
    const { data: trashes, isPending: isTrashesPending, error: trashesError } = useFetch("http://localhost:5000/trash");

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
                        {ticketsError && <div className="error">{ticketsError}</div>}
                        {isTicketsPending && <div className="loading">Loading tickets...</div>}
                        {tickets && <TicketList tickets={tickets} title="My offers:" />}
                    </div>
                    <div className="trash">
                        {trashesError && <div className="error">{trashesError}</div>}
                        {isTrashesPending && <div className="loading">Loading trash...</div>}
                        {trashes && <Trash trashes={trashes} title="My trash:" />}
                    </div>
                </div>

            </div>

        </div>
    ) : (
        <p className="loading-text">Loading profile...</p>
    );
}

export default Profile;
