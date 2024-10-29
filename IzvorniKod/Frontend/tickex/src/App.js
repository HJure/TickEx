import './style/App.css';
import './style/login.css';
import './style/profile.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LogIn';
import Profile from './components/Profile';
import TicketDetails from './components/TicketDetails';

function App() {
    return (
        <Router>
            <div className="App">
                <div className='app-header'>
                    <h1 className='app-name'>TickEx</h1>
                    <img src="/pictures/swap.png" alt="swap" className='app-icon' />
                </div>
                <Routes>
                    <Route path="/signup" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tickets/:id" element={<TicketDetails url="http://localhost:8000/tickets/" />} />
                    <Route path="/trashes/:id" element={<TicketDetails url="http://localhost:5000/trash/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
