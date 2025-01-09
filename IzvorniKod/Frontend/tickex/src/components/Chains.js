import '../style/Chains.css';

const Chains = ({ chains }) => {
    const userId = localStorage.getItem('userID');

    const userChains = chains.map(chain => {
        const { idkor, idogl } = chain;
        return idkor.map((userId, index) => ({
            userId,
            ticketId: idogl[index]
        }));
    });

    return (
        <div className="chains-list">
            <div className="chains">
                {userChains.length > 0 ? (
                    userChains.map((chainGroup, index) => (
                        <div key={index} className="chain-group">
                            {chainGroup.map((chainItem, idx) => (
                                <div key={idx} className="chain-container">
                                    <div className="chain-item">
                                        <p>Korisnik ID: {chainItem.userId}</p>
                                        <p>Karta ID: {chainItem.ticketId}</p>
                                    </div>
                                    {idx < chainGroup.length - 1 && (
                                        <div className="arrow-container">
                                            <img
                                                alt="next"
                                                src="../images/next-button.png"
                                                className="arrow"
                                            />
                                        </div>
                                    )}
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
};

export default Chains;
