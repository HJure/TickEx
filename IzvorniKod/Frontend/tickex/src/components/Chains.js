import '../style/Chains.css';

const Chains = ({ chains }) => {
    const userId = localStorage.getItem('userID');

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

    const userChains = [];
    for (let i = 0; i < arrayChains.length; i++) {
        const chainGroup = arrayChains[i];
        let userFound = false;

        for (let j = 0; j < chainGroup.length; j++) {
            const chainItem = chainGroup[j];

            console.log('Checking userId:', chainItem.userId.id, 'Against userId:', userId);
            if (chainItem.userId.id == userId) {
                userFound = true;
                break; 
            }
        }

        if (userFound) {
            userChains.push(chainGroup);
        }
    }

    console.log(userChains);

    return (
        <div className="chains-list">
            <div className="chains">
                {userChains.length > 0 ? (
                    userChains.map((chainGroup, index) => (
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
                    ))
                ) : (
                    <p className="no-chains-message">Ne sudjelujete niti u jednom lancu razmjene.</p>
                )}
            </div>
        </div>
    );
}    

export default Chains;
