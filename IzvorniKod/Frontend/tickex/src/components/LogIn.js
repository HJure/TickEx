import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'; 

function Login() {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            localStorage.setItem("user", JSON.stringify(codeResponse));
            //console.log(codeResponse);
            navigate('/profile');  
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className="login-container">
            <img src="/pictures/signup.png" alt="signup" className="login-image" />
            <p className="login-heading">Get going with your account</p>
            <button onClick={() => login()} className="login-button">
                <FcGoogle style={{ marginRight: '8px', fontSize: '24px' }} /> 
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}

export default Login;
