import React from 'react';
import '../style/About.css';


function About(){
    return(
        <>
        <div id ="about">
            <div className="ab_container">
                <div id="about-content-left">
                    <h1>O nama</h1>
                    <p className ="about-p">
                        TickEx je aplikacija za brzu i pouzdanu razmjenu te kupnju karata. Omogućuje razmjenu karata s ljudima iz cijelog svijeta za isti ili sasvim drugi događaj. Koncerti, utakmice, festivali i mnogo drugo nikad vam nisu bili dostupniji!
                        Upoznajte ljude iz cijelog svijeta, iskusite koncert svojih snova baš kako ste zamišljali na intuitivan i siguran način.
                    </p>
                    <button className="aboutBtn">Saznaj više</button>
                </div>
            </div>
        </div>
    </>
    )
    
}

export default About;