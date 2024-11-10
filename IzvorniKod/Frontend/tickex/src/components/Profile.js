import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import useFetch from './useFetch';
import axios from 'axios'; 
import TicketList from './TicketList'; 
import Trash from './Trash';
import '../style/profile.css';
import { Link } from "react-router-dom";

function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                setProfile(res.data);
                console.log(res.data);
            }).catch((err) => console.log(err));
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("access_token");
        setProfile(null);
        navigate('/signup');
    };

    const { data: tickets, isPending: isTicketsPending, error: ticketsError } = useFetch("http://localhost:8080/api/tickets");
    const { data: trashes, isPending: isTrashesPending, error: trashesError } = useFetch("http://localhost:5000/trash");

    return profile ? (
        <div className='profilediv'>
            <div className="profile-container">
                <img src={profile.picture} alt="user" className="profile-image" />
                <h3 className="profile-heading">Korisnik prijavljen</h3>
                <p className="profile-info">Ime: {profile.name}</p>
                <p className="profile-info">Email Adresa: {profile.email}</p>
                <button onClick={logOut} className="logout-button">Odjavi se</button>
            </div>
            <div>
                {ticketsError && <div className='error'>{ticketsError}</div>}
                {isTicketsPending && <div className='loading'>Učitavam karte...</div>}
                <div className="my_offers_trash_container">
                    <div className="my_offers">
                        {ticketsError && <div className="error">{ticketsError}</div>}
                        {isTicketsPending && <div className="loading">Učitavam karte...</div>}
                        {tickets && <TicketList tickets={tickets} title="My offers:" />}
                    </div>
                    <div className="trash">
                        {trashesError && <div className="error">{trashesError}</div>}
                        {isTrashesPending && <div className="loading">Učitavam otpad...</div>}
                        {trashes && <Trash trashes={trashes} title="My trash:" />}
                    </div>
                </div>
            </div>
            <br/>
            <br />
            <Link to="/create" className="newBlog">Dodaj novi blog</Link>
        </div>
    ) : (
        <p className="loading-text">Učitavam profil...</p>
    );
}

export default Profile;
