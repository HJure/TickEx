import './style/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LogIn';
import Profile from './components/Profile';
import TicketDetails from './components/TicketDetails';
import SaleDetails from './components/SaleDetails';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';
import Exchange from './components/Exchange';
import Create from './components/Create';
import Shop from './components/Shop'
import UserForm from './components/UserForm';
import { useState } from "react";
import Buy from './components/Buy';
import Auction from './components/Auction';
import Reports from './components/Reports';

function App() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const [profile, setProfile] = useState(null);
    return (
        <Router>
            <div className="App">
            <Navbar profile={profile} setProfile={setProfile}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Login />} />
                    <Route path="/profile" element={<Profile profile={profile} setProfile={setProfile}/>} />
                    <Route path="/tickets/:id" element={<TicketDetails url={`${backendUrl}/api/tickets/`} />} />
                    <Route path="/sales/:id" element={<SaleDetails url={`${backendUrl}/api/tickets/`} />} />
                    <Route path="/exchange" element={<Exchange />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/register" element={<UserForm />} />
                    <Route path="/buy" element={<Buy />} />
                    <Route path="/auction" element={<Auction />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            <Footer />
            </div>
        </Router>
    );
}

export default App;
