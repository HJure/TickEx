import React from 'react';
import Navbar from './components/Navbar';
import Landingpage from './pages/Landingpage';
import About from './pages/About';
import UpcomingEvents from './pages/UpcomingEvents';
import Footer from './pages/Footer'
import './App.css';

function App() {
  return (
    <>
    <div className="App">
        <Navbar />
        <Landingpage />
        <About />
        <UpcomingEvents />
        <Footer />
    </div>
    </>
  );
}

export default App;
