import React from 'react'
import '../style/Navbar.css'
import Landingpage from '../pages/Landingpage';
import About from '../pages/About';
import UpcomingEvents from '../pages/UpcomingEvents';

function Home(){
    return (
        <div className="home">
            <Landingpage />
            <About />
            <UpcomingEvents />
        </div>
    )
}

export default Home;