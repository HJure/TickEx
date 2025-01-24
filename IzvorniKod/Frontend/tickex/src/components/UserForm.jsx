import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SavePreferences from "./SavePreferences";
import { parseUrlParams } from '../utils/parseUrlParams';
import '../style/UserForm.css';

const UserForm = () => {
    const [imeKor, setImeKor] = useState('');
    const [prezimeKor, setPrezimeKor] = useState('');
    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    //const [preferences, setPreferences] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const access_token = localStorage.getItem("access_token");

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailFromUrl = params.get("email");

        setEmail(emailFromUrl);
    }, [location.search]);

    const submitFunction = (e) => {
        e.preventDefault();
        const datumUla = new Date().toISOString().split('T')[0];
        const user = { email, imeKor, prezimeKor, datumUla, statusKor: true, ocjena: 0.0, admin: false };
        setIsPending(true);

        fetch(`${backendUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(() => {
                setTimeout(() => {
                    const { accessToken } = parseUrlParams();
                    localStorage.setItem("access_token", accessToken);
                    localStorage.setItem("user_email", email);
                    localStorage.setItem("user_first_name", imeKor);
                    localStorage.setItem("user_last_name", prezimeKor);
                    localStorage.setItem("user_registration_date", datumUla);

                    //console.log('new user added');
                    setIsPending(false);
                    navigate('/profile');
                }, 1500);

                const url = `${backendUrl}/api/savePreferences?email=${encodeURIComponent(email)}`;
                const selectedCategories = JSON.parse(localStorage.getItem("selectedCategories") || "[]");
                //console.log("Selected categories before fetching savePreferences: ", selectedCategories);

                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedCategories),
                });
            })
            .then(() => {
                //console.log("Preferences saved successfully");
            })
            .catch((err) => {
                console.log(err);
                //console.log("An error occurred");
                setIsPending(false);
                navigate('/signup');
            });
    };

    return (
        <div className="userInfo">
            <h2>Informacije o korisniku</h2>
            <form onSubmit={submitFunction}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    readOnly 
                />
                <label>Ime:</label>
                <input 
                    type="text" 
                    required 
                    value={imeKor} 
                    onChange={(e) => setImeKor(e.target.value)}
                />
                <label>Prezime:</label>
                <input 
                    type="text" 
                    required 
                    value={prezimeKor} 
                    onChange={(e) => setPrezimeKor(e.target.value)}
                />
                <label>Označite kategorije koje vas zanimaju.</label>
                <div className="likedCategories">
                    <SavePreferences />
                </div>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Dodavanje korisnika...</button>}
            </form>
        </div>
    );
}

export default UserForm;
