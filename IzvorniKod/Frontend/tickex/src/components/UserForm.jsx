import React from 'react'
import {useState, useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

import '../style/UserForm.css'

const UserForm = () => {
    const [imeKor, setImeKor] = useState('');
    const [prezimeKor, setPrezimeKor] = useState('');
    const [userMail, setUserMail] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.userEmail) {
            setUserMail(location.state.userEmail);
        }
    }, [location.state]);

    const submitFunction = (e) => {
        e.preventDefault();
        const user = {userMail, imeKor, prezimeKor};
        setIsPending(true);

        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            setTimeout(() => { 
                console.log('new user added');
                setIsPending(false);
                navigate('/profile'); 
            }, 1500);
        }).catch((err) => {
            console.log(err);
            setTimeout(1500);
            navigate('/signup');
        });
    };

  return (
    <div className = "userInfo">
        <h2>Informacije o korisniku</h2>
        <form onSubmit={submitFunction}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={userMail} 
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
  )
}
export default UserForm;
