import React from 'react';
import '../style/Footer.css';

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
                            TickEx - iskusite život kako spada!
                            </p>
                            <p>
                            Pratite nas na društvenim mrežama!
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
                        <h3>Korisne informacije</h3>
                    </div>
                    <div className="useful-links-container">
                        <ul>
                            <li><a href="/">Usluge</a></li>
                            <li><a href="/">Portfolio</a></li>
                            <li><a href="/">Kontakt</a></li>
                        </ul>
                        <ul>
                            <li><a href="/">Naš tim</a></li>
                            <li><a href="/">Kontaktirajte nas</a></li>
                            <li><a href="/">Novnosti</a></li>
                        </ul>
                    </div>
               </div>
            </div>
        </div>
        </>
    )
}

export default Footer;
