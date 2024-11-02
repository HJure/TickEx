import React from 'react';
import './About.css';

function About(){
    return(
        <>
        <div id ="about">
            <div className="ab_container">
                <div id="about-content-left">
                    <h1>About us</h1>
                    <p className ="about-p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt voluptas expedita sint harum atque aut, architecto blanditiis deleniti porro cumque ipsam incidunt accusamus, adipisci commodi eveniet. Consequuntur doloremque corporis nemo fugit, ipsa molestiae laborum?
                    </p>
                    <button className="aboutBtn">Learn more</button>
                </div>
            </div>
        </div>
    </>
    )
    
}

export default About;