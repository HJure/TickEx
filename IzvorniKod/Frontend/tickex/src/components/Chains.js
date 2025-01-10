import React, { useState, useEffect } from 'react';
import '../style/Chains.css';

const Chains = ({ chains }) => {
    const userId = localStorage.getItem('userID');
    const [updatedChains, setUpdatedChains] = useState(chains ||[]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const allResponsesTrue = (responses) => responses.every(Boolean);

    const handleResponse = (chainId, userIndex, responseStatus) => {

        setUpdatedChains((prevState) =>
            prevState.map((chain) =>
                chain.id === chainId
                    ? {
                          ...chain,
                          response: chain.response.map((res, index) =>
                              index === userIndex ? responseStatus : res
                          ),
                      }
                    : chain
            )
        );

        fetch(`${backendUrl}/api/chain/${chainId}/updateResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userIndex: userIndex,
                response: responseStatus,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update response');
                }

                return fetch(`${backendUrl}/api/chain/${chainId}/checkCompletion`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
            .then((response) => response.text())
            .then((message) => {
                if (message === 'Uspješno obavljena razmjena' || message === 'Neuspješno obavljena razmjena') {
                    setUpdatedChains((prevState) =>
                        prevState.map((chain) =>
                            chain.id === chainId
                                ? { ...chain, completed: true }
                                : chain
                        )
                    );
                    alert(message);
                }
            })
            .catch((error) => {
                console.error('Error updating response:', error);
            });
    };

    const checkAndUpdateChains = () => {
        fetch(`${backendUrl}/api/chain/checkExpiration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userID'), 
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to check chain time');
                }
                return response.json();
            })
            .then((updatedChainsData) => {
                setUpdatedChains(updatedChainsData);
    
                updatedChainsData.forEach((chain) => {
                    fetch(`${backendUrl}/api/chain/${chain.id}/checkCompletion`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.text())
                        .then((message) => {
                            if (message === 'Uspješno obavljena razmjena' || message === 'Neuspješno obavljena razmjena') {
                                setUpdatedChains((prevState) =>
                                    prevState.map((prevChain) =>
                                        prevChain.id === chain.id
                                            ? { ...prevChain, completed: true }
                                            : prevChain
                                    )
                                );
                                alert(message);
                            }
                        })
                        .catch((error) => {
                            console.error('Error checking chain completion:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error checking chain time:', error);
            });
    };

    useEffect(() => {
        checkAndUpdateChains();
    }, []);

    
    const userChains = updatedChains.map((chain) => {
        const { idkor, idogl, response } = chain;
        return idkor.map((userId, index) => ({
            userId,
            ticketId: idogl[index],
            response: response[index],
            userIndex: index,
            chainId: chain.id,
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
                                        {!updatedChains[index]?.completed &&
                                            chainItem.userId === Number(userId) && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            handleResponse(chainItem.chainId, chainItem.userIndex, true)
                                                        }
                                                    >
                                                        PRIHVATI
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleResponse(chainItem.chainId, chainItem.userIndex, false)
                                                        }
                                                    >
                                                        ODBI
                                                    </button>
                                                </div>
                                            )}

                                        {updatedChains[index]?.completed && (
                                            <p>
                                                {allResponsesTrue(updatedChains[index]?.response)
                                                    ? 'Uspješno obavljena razmjena'
                                                    : 'Neuspješno obavljena razmjena'}
                                            </p>
                                        )}
                                        {}
                                        <div className="user-responses">
                                            {chainItem.response !== null ? (
                                                <p>Odgovor: {chainItem.response ? 'Prihvaćeno' : 'Odbijeno'}</p>
                                            ) : (
                                                <p>Bez odgovora</p>
                                            )}
                                        </div>
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
                    <p className="no-chains-message">
                        Ne sudjelujete niti u jednom lancu razmjene.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Chains;