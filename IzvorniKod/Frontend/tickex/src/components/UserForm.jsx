import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseUrlParams } from '../utils/parseUrlParams';
import '../style/UserForm.css';

const UserForm = () => {
    const [imeKor, setImeKor] = useState('');
    const [prezimeKor, setPrezimeKor] = useState('');
    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailFromUrl = params.get("email");

        setEmail(emailFromUrl);
    }, [location.search]);

    const submitFunction = (e) => {
        e.preventDefault();
        const datumUla = new Date().toISOString().split('T')[0];
        const user = { email, imeKor, prezimeKor, datumUla };
        setIsPending(true);

        fetch('https://backend-3qyr.onrender.com/api/api/users/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(() => {
            setTimeout(() => { 
    
                const { accessToken } = parseUrlParams();
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("user_email", email);
                localStorage.setItem("user_first_name", imeKor);
                localStorage.setItem("user_last_name", prezimeKor);
                localStorage.setItem("user_registration_date", datumUla);

                console.log('new user added');
                setIsPending(false);
                navigate('/profile'); 
            }, 1500);
        })
        .catch((err) => {
            console.log(err);
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
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Dodavanje korisnika...</button>}
            </form>
        </div>
    );
}

export default UserForm;
