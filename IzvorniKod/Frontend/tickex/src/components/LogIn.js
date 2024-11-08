import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/login.css';

function Login() {

    const handleLoginClick = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="login-container">
            <img src="/images/signup.png" alt="signup" className="login-image" />
            <p className="login-heading">Get going with your account</p>
            <button onClick={handleLoginClick} className="login-button">
                <FcGoogle style={{ marginRight: '8px', fontSize: '24px' }} /> 
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}

export default Login;
