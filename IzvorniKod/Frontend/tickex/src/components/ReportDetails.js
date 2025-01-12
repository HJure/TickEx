import '../style/ticket-details.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReportDetails = () => {
    const location = useLocation();
    const result = location.state?.result || location.state?.ticket || {};
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access_token) {
            setError("Access token is missing.");
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [access_token]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleButtonClick = async () => {
        const reporter = localStorage.getItem("userID");
        const reported = result.owner.id;
        const reason = inputValue;
        const data = {
            reporterId: reporter,
            reportedId: reported,
            reason: reason
        };

        try {
            const response = await fetch(`${backendUrl}/api/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData !== true) {
            alert("User already reported or trying to self report!");
        } else {
            alert("Report submitted successfully!");
        }
        } catch (err) {
            console.error("Error submitting report:", err);
            alert("Failed to submit report.");
        }
    };

    return (
        <div style={{width: "90%", margin: "16px auto 16px", backgroundColor: "#9955EB", padding: "16px", borderRadius: "8px", border: "solid black 2px"}}>
            <h1>Report Details</h1>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                    <strong>Reporter:</strong> {localStorage.getItem("user_first_name")} {localStorage.getItem("user_last_name")}  ({localStorage.getItem("user_email")})
                </div>
                <div>
                    <strong>Reported:</strong> {result.owner.imeKor} {result.owner.prezimeKor} ({result.owner.email})
                </div>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Unesi razlog za prijavu korisnika" style={{backgroundColor: "white" }}/>
                <button onClick={handleButtonClick} style={{marginLeft: "10px", backgroundColor: "#8945DB", borderRadius: "8px", border: "solid black 2px", color: "white"}}>Prijavi</button>
            </div>
        </div>
    );
};

export default ReportDetails;