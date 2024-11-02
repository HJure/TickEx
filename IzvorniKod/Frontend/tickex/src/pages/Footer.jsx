import React from 'react';
import './Footer.css';

function Footer(){
    return(
        <>
        <div className ="emptySpace">
            
        </div>
        <div className="footer">
            <div className="ft_container">
               <div className="footer-content">
                    <div className="footer-content-logo">
                        <h2>TickEx</h2>
                    </div>
                    <div className="footer-text">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem pariatur veniam saepe animi, praesentium quasi accusamus omnis aut velit nisi suscipit a excepturi sit voluptates voluptatum hic voluptas eaque officiis aspernatur! Voluptate, harum dolor.
                        </p>
                    </div>
                    <div className="footer-socials">
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-facebook"></i>
                    </div>
               </div>

               <div className="footer-content-boxes">
                    <div className="footer-content-boxes-header">
                        <h3>Useful Links</h3>
                    </div>
                    <div className="useful-links-container">
                        <ul>
                            <li><a href="/">Services</a></li>
                            <li><a href="/">Portfolio</a></li>
                            <li><a href="/">Contact</a></li>
                        </ul>
                        <ul>
                            <li><a href="/">Expert Team</a></li>
                            <li><a href="/">Contact Us</a></li>
                            <li><a href="/">Latest News</a></li>
                        </ul>
                    </div>
               </div>
            </div>
        </div>
        </>
    )
}

export default Footer;