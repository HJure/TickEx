import React, {useEffect} from 'react'
import '../style/Navbar.css'
import Landingpage from '../pages/Landingpage';
import About from '../pages/About';
import UpcomingEvents from '../pages/UpcomingEvents';
import { parseUrlParams } from '../utils/parseUrlParams';


function Home(){
    useEffect(() => {
        const { accessToken } = parseUrlParams();

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            window.history.replaceState({}, document.title, "/");
        }
    }, []);

    return (
        <div className="home">
            <Landingpage />
            <About />
            <UpcomingEvents />
        </div>
    )
}

export default Home;