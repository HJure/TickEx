import React, { useState, useEffect } from 'react';
import '../style/Chains.css';

const Chains = ({ chains }) => {
    const userId = localStorage.getItem('userID');
    const [updatedChains, setUpdatedChains] = useState(Array.isArray(chains) ? chains : []);
    const [users, setUsers] = useState({});
    const [tickets, setTickets] = useState({});
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const allResponsesTrue = (responses) => responses?.every(Boolean);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/users`);
            const data = await response.json();
            const usersMap = {};
            data.forEach((user) => {
                usersMap[user.id] = `${user.imeKor} ${user.prezimeKor}`;
            });
            setUsers(usersMap);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTickets = async () => {
        try {
            const endpoints = [`${backendUrl}/api/tickets`, `${backendUrl}/api/tickets/expired`];
            const ticketResponses = await Promise.all(endpoints.map((url) => fetch(url).then((res) => res.json())));

            const ticketsMap = {};
            ticketResponses.flat().forEach((ticket) => {
                ticketsMap[ticket.id] = ticket.eventName;
            });

            setTickets(ticketsMap);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

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

    useEffect(() => {
        fetchUsers();
        fetchTickets();
    }, []);

    const userChains = updatedChains.length
        ? updatedChains.map((chain) => {
              const { idkor, idogl, response } = chain;
              return idkor.map((userId, index) => ({
                  userId,
                  ticketId: idogl[index],
                  response: response[index],
                  userIndex: index,
                  chainId: chain.id,
              }));
          })
        : [];

    return (
        <div className="chains-list">
            <div className="chains">
                {userChains.length > 0 ? (
                    userChains.map((chainGroup, index) => (
                        <div key={index} className="chain-group">
                            {chainGroup.map((chainItem, idx) => (
                                <div key={idx} className="chain-container">
                                    <div className="chain-item">
                                        <p>Korisnik: {users[chainItem.userId] || `ID: ${chainItem.userId}`}</p>
                                        <p>Karta: {tickets[chainItem.ticketId] || `ID: ${chainItem.ticketId}`}</p>
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
