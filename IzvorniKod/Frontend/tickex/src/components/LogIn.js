import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/login.css';

function Login() {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try{
                if (JSON.parse(localStorage.getItem("user")) == null){
                    localStorage.setItem("user", JSON.stringify(codeResponse));
                    const response = await axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${codeResponse.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    const userMail = response.data.email;
                    console.log("user email: ", userMail);
                    navigate('/register', { replace: true, state: { userEmail:userMail} });
                }else{
                    navigate('/profile');
                }
            } catch (error){
                console.error(error);
            } 
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className="login-container">
            <img src="/images/signup.png" alt="signup" className="login-image" />
            <p className="login-heading">Get going with your account</p>
            <button onClick={() => login()} className="login-button">
                <FcGoogle style={{ marginRight: '8px', fontSize: '24px' }} /> 
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}

export default Login;
