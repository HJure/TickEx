import React, { useState, useEffect } from 'react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem('access_token');

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

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Reports</h2>
            {reports.length > 0 ? (
                <div>
                {reports.map((report) => (
                    <div key={`${report.reporter.id}-${report.reported.id}`} style={{width: "50%", margin: "0 auto 16px", backgroundColor: "#9955EB", padding: "16px", borderRadius: "8px", border: "solid black 2px"}}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <div>
                            <strong>Reporter:</strong> {report.reporter.imeKor} {report.reporter.prezimeKor}  ({report.reporter.email})
                            </div>
                            <div>
                            <strong>Reported:</strong> {report.reported.imeKor} {report.reported.prezimeKor}  ({report.reported.email})
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
