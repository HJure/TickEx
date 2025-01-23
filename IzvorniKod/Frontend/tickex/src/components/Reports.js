import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Reports.css';

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
        navigate(`/user/${userId}/tickets`);
    };

    return (
        <div>
        <h2 className="reports-title">Prijave</h2>
        {reports.length > 0 ? (
            <div>
                {reports.map((report) => (
                    <div key={`${report.reporter.id}-${report.reported.id}`} className="report-card">
                        <div className="report-card-header">
                            <button 
                                onClick={() => handleUserClick(report.reporter.id)} 
                                className="link-button">
                                <strong>Prijavio:</strong> {report.reporter.imeKor} {report.reporter.prezimeKor} ({report.reporter.email})
                                <strong>Datum ulaska:</strong>{report.reported.datumUla} 
                                <strong>Ocjena:</strong>{report.reported.ocjena}
                            </button>
                        
                            <button 
                                onClick={() => handleUserClick(report.reported.id)} 
                                className="link-button">
                                <strong>Prijavljen:</strong> {report.reported.imeKor} {report.reported.prezimeKor} ({report.reported.email}) 
                                <strong>Datum ulaska:</strong>{report.reported.datumUla} 
                                <strong>Ocjena:</strong>{report.reported.ocjena}
                            </button>
                        </div>
                        <div className='strong'>
                            <strong>Razlog:</strong> {report.reason}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="no-reports">Nema prijava.</p>
        )}
    </div>
    );
};

export default Reports;
