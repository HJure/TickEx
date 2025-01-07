import React, { useState, useEffect } from 'react';
import '../style/Chains.css';

const Chains = ({ chains }) => {
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('user_id');

    const visitedIDs = [];
    const arrayChains = [];
    let chain = [];

    for (let i = 0; i < chains.length; i++) {
        const element = chains[i];

        if (!visitedIDs.includes(element.id)) { 
            if (chain.length > 0) {
                arrayChains.push(chain);
            }
            visitedIDs.push(element.id);  
            chain = [];  
        }

        chain.push(element);
    }

    if (chain.length > 0) {
        arrayChains.push(chain);
    }

    console.log("ARRAY");
    console.log(arrayChains);

    return (
        <div className="chains-list">
            <div className="chains">
                {arrayChains.map((chainGroup, index) => (
                    <div key={index} className="chain-group">
                        {chainGroup.map((chainItem, idx) => (
                            <div key={idx} className="chain-item">
                                <p>User: {chainItem.userId.imeKor} {chainItem.userId.prezimeKor}</p>
                                <p>Ticket Event: {chainItem.ticketId.eventName}</p>
                                <p>Wanted Event: {chainItem.ticketId.wantedEventName}</p>
                                <img alt='next' src='../images/next-button.png' className='arrow'/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chains;
