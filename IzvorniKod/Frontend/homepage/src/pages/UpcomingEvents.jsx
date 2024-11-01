import React from 'react';
import './UpcomingEvents.css';
import { Events } from '../Data';

function UpcomingEvents(){
    return(
        <>
        <div className="events-container">
            <h1>Upcoming events</h1>
            <div className="cards-container-box">
                {
                    Events.map((event) => {
                        return(
                            <button className="moreInfoBtn">
                                <div key={event.id} className ="card">
                                    <img className ="card-img" src = {event.image} alt =""></img>
                                    <h1>{event.title}</h1>
                                    <h4>{event.description}</h4>
                                    <h2>{event.price}</h2>
                                </div>
                            </button>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default UpcomingEvents;
