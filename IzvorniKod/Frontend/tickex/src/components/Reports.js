import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/reports/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`
                    },
                    credentials: 'include'
                });

                if (!response.ok) { 
                    throw new Error('Access denied!');
                }

                const data = await response.json();
                setReports(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching reports:', err);
            }
        };

        fetchReports();
    }, [backendUrl, access_token]);

    if (error) {
        return <div>{error}</div>;
    }

    const handleUserClick = (userId) => {
        // Navigate to the user's tickets page
        navigate(`/user/${userId}/tickets`);
    };

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Reports</h2>
            {reports.length > 0 ? (
                <div>
                    {reports.map((report) => (
                        <div key={`${report.reporter.id}-${report.reported.id}`} style={{width: "50%", margin: "0 auto 16px", backgroundColor: "#9955EB", padding: "16px", borderRadius: "8px", border: "solid black 2px"}}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <div>
                                    <button 
                                        onClick={() => handleUserClick(report.reporter.id)} 
                                        style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>
                                        <strong>Reporter:</strong> {report.reporter.imeKor} {report.reporter.prezimeKor} ({report.reporter.email})
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => handleUserClick(report.reported.id)} 
                                        style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>
                                        <strong>Reported:</strong> {report.reported.imeKor} {report.reported.prezimeKor} ({report.reported.email})
                                    </button>
                                </div>
                            </div>
                            <div>
                                <strong>Reason:</strong> {report.reason}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: "#fff", textAlign: "center" }}>No reports available.</p>
            )}
        </div>
    );
};

export default Reports;
