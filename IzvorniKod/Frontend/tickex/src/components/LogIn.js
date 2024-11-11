import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import '../style/login.css';

function Login() {

    const handleLoginClick = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="login-container">
            <img src="/images/signup.png" alt="signup" className="login-image" />
            <p className="login-heading">Ulogiraj se i započni s razmjenom karata!</p>
            <button onClick={handleLoginClick} className="login-button">
                <FcGoogle style={{ marginRight: '8px', fontSize: '24px' }} /> 
                <span>Prijava Google računom</span>
            </button>
        </div>
    );
}

export default Login;
