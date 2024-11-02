import React from 'react'
import '../style/Navbar.css'

function Navbar(){
    return (
        <>
          <div className="navigation">
            <a href="/" className="logo">
            <img src="./images/logo.png" alt ="logo"></img>
            </a>
            <nav className ="navigation-menu">
                <ul>
                    <li><a className = "nav-link nav-link-line"
                     href="profile">Profile</a></li>
                     <li><a className = "nav-link nav-link-line"
                     href="signup">Sign up</a></li>
                     <li><a className = "nav-link nav-link-line"
                     href="#about">About</a></li>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default Navbar;