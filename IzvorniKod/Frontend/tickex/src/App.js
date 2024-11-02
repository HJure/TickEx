import './style/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LogIn';
import Profile from './components/Profile';
import TicketDetails from './components/TicketDetails';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';

function App() {
    return (
        <Router>
            <div className="App">
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tickets/:id" element={<TicketDetails url="http://localhost:8000/tickets/" />} />
                    <Route path="/trashes/:id" element={<TicketDetails url="http://localhost:5000/trash/" />} />
                </Routes>
            <Footer />
            </div>
        </Router>
    );
}

export default App;
