import React from 'react';
import '../style/UpcomingEvents.css';
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
                            <button key={event.id} className="moreInfoBtn">
                                <div className="card">
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
