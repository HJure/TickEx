import React, { useState, useEffect } from 'react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/reports`, {
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
            <h2>Admin Reports</h2>
            {reports.length > 0 ? (
                <ul>
                    {reports.map((report) => (
                        <li key={`${report.reporter.id}-${report.reported.id}`}>
                            <strong>{report.reporter.name}</strong> reported <strong>{report.reported.name}</strong>: {report.reason}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
};

export default Reports;
