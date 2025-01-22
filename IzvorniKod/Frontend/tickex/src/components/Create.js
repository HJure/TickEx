import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Create.css';

const Create = () => {
    const [dogadaji, setDogadaji] = useState([]);
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [seatNumber, setSeatNumber] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [nazVrDog, setnazVrDog] = useState('');
    const [eventTypeId, setEventTypeId] = useState('');
    const [price, setPrice] = useState(0);
    const [warnings, setWarnings] = useState({
        price: '',
        seatNumber: '',
        ticketType: '',
        wantedSeatNumber: '',
        wantedTicketType: '',
        startPrice: ''
    });
    const [isPending, setIsPending] = useState(false);
    const [namjena, setNamjena] = useState('');
    const [startPrice, setStartPrice] = useState(0);
    const [duration, setDuration] = useState('');
    const [wantedEventName, setwantedEventName] = useState('');
    const [wantedLocation, setwantedLocation] = useState('');
    const [wantedDate, setwantedDate] = useState('');
    const [wantedSeatNumber, setwantedSeatNumber] = useState('');
    const [wantedTicketType, setwantedTicketType] = useState('');
    const [artistName, setartistName] = useState('');
    const [pomoc, setPomoc] = useState(null);
    const [idrazmjena, setIdRazmjena] = useState(null);

    const navigate = useNavigate();

    const email = localStorage.getItem("user_email");
    const access_token = localStorage.getItem("access_token");
    const imeKor = localStorage.getItem("user_first_name");
    const prezimeKor = localStorage.getItem("user_last_name");
    const datumUla = localStorage.getItem("user_registration_date");
    const statusKor = localStorage.getItem("user_status");
    const ocjena =  localStorage.getItem("user_rating");

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = currentDate.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);
    
    useEffect(() => {
        if (pomoc) {
            const handleProcessExchange = (id) => {
                fetch(`${backendUrl}/api/exchanges/${id}/process`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.ok) {
                        return response.text(); 
                    } else {
                        throw new Error("Obrada lanca razmjene nije uspjela.");
                    }
                })
                .then((message) => {
                    if (message === "Nema lanaca") {
                        alert("Trenutno nije dostupan nijedan lanac, no kad bude dostupan bit ćete obaviješteni.");
                    } else if (message === "Uspješno pronađen lanac zamjene!") {
                        setIdRazmjena(id);
                    }
                })
                .catch((error) => {
                    console.error("Greška prilikom obrade razmjene:", error);
                    alert("Došlo je do pogreške prilikom obrade razmjene.");
                });
            };  
            handleProcessExchange(pomoc);
        }
    }, [pomoc, backendUrl]);  

    useEffect(() => {
        if (idrazmjena) {
            fetch(`${backendUrl}/api/chain/ticket/${idrazmjena}`)
                .then((res) => res.json())
                .then((chains) => {
                    chains.forEach((chain) => {
    
                        const filteredUserIds = chain.idkor.filter(id => id !== parseInt(localStorage.getItem("userID")));
    
                        filteredUserIds.forEach(idkor => {
                            fetch(`${backendUrl}/api/users/${idkor}`)
                                .then(res => res.json())
                                .then(user => {
                                    const userEmail = user.email;
    
                                    chain.idogl.forEach(idkarta => {
                                        fetch(`${backendUrl}/api/tickets/${idkarta}`)
                                            .then(res => res.json())
                                            .then(ticket => {
                                                const sendEmail = (email, ticket) => {
                                                    fetch(`${backendUrl}/api/emails/send`, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            Authorization: `Bearer ${access_token}`, 
                                                        },
                                                        body: JSON.stringify({
                                                            to: email,
                                                            subject: "Nova karta u lancu razmjene",
                                                            body: `Nova karta (${ticket.eventName}) je došla u lanac razmjene u kojem sudjelujete. Molim Vas potvrdite razmjenu unutar aplikacije.`,
                                                        }),
                                                    })
                                                        .then((response) => {
                                                            if (!response.ok) {
                                                                console.error(`Greška prilikom slanja emaila na ${email}`);
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.error("Greška prilikom slanja emaila:", error);
                                                        });
                                                };
                                                sendEmail(userEmail,ticket)
                                            });
                                    });
                                });
                        });
                    });
    
                    alert("Uspješno pronađen lanac zamjene! Emailovi su poslani svim korisnicima u lancu.");
                });
        }
    }, [idrazmjena, backendUrl]);
    
    
    const validatePrice = (value) => {
        const intPrice = parseInt(value, 10);
        if (isNaN(intPrice) || intPrice < 0 || intPrice > Number.MAX_SAFE_INTEGER) {
            return 'Cijena mora biti broj između 0 i najvećeg cijelog broja.';
        }
        return '';
    };

    const validateSeatNumber = (value) => {
        if (value && isNaN(parseInt(value, 10))) {
            return 'Broj sjedala mora biti cijeli broj ili ostavite prazno.';
        }
        return '';
    };

    const validateTicketType = (value) => {
        if (value && !isNaN(value)) {
            return 'Vrsta ulaznice ne može biti samo broj.';
        }
        return '';
    };

    const validateWantedSeatNumber = (value) => {
        if (value && isNaN(parseInt(value, 10))) {
            return 'Željeni broj sjedala mora biti cijeli broj ili ostavite prazno.';
        }
        return '';
    };

    const validateWantedTicketType = (value) => {
        if (value && !isNaN(value)) {
            return 'Željena vrsta ulaznice ne može biti samo broj.';
        }
        return '';
    };

    const validateStartPrice = (value) => {
        const intPrice = parseInt(value, 10);
        if (isNaN(intPrice) || intPrice < 0 || intPrice > Number.MAX_SAFE_INTEGER) {
            return 'Početna cijena mora biti broj između 0 i najvećeg cijelog broja.';
        }
        return '';
    };

    useEffect(() => {
        const fetchVrDog = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/vrsta-dogadaja`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Error while fetching VrDog data');
                const data = await response.json();
                setDogadaji(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchVrDog();
    }, [backendUrl]);

    const handleEventTypeChange = (e) => {
        const selectedNazVrDog = e.target.value;
        setnazVrDog(selectedNazVrDog);
        const selectedDogadaj = dogadaji.find(dogadaj => dogadaj.nazVrDog === selectedNazVrDog);
        setEventTypeId(selectedDogadaj ? selectedDogadaj.id : null);
    };       
    
      
  const handleSubmit = (e) => {
    e.preventDefault();

    const priceWarning = validatePrice(price); 
    const seatNumberWarning = validateSeatNumber(seatNumber);
    const ticketTypeWarning = validateTicketType(ticketType);
    const startPriceWarning = validateStartPrice(startPrice);
    const wantedSeatNumberWarning = validateWantedSeatNumber(wantedSeatNumber);
    const wantedTicketTypeWarning = validateWantedTicketType(wantedTicketType);

    if (priceWarning || seatNumberWarning || ticketTypeWarning || startPriceWarning || wantedSeatNumberWarning || wantedTicketTypeWarning) {
        setWarnings({
            price: priceWarning,
            seatNumber: seatNumberWarning,
            ticketType: ticketTypeWarning,
            startPrice: startPriceWarning,
            wantedSeatNumber: wantedSeatNumberWarning,
            wantedTicketType: wantedTicketTypeWarning
        });
        return;
    }

    let ticket = {
        eventTypeId: { id: eventTypeId, nazVrDog: nazVrDog },
        eventName,
        eventDate: new Date(eventDate).toISOString(),
        location,
        seatNumber: seatNumber ? parseInt(seatNumber) : null,
        ticketType: ticketType || null,
        artistName: nazVrDog === "Glazba" ? artistName : null,
        owner: { id: localStorage.getItem("userID"), email, imeKor, prezimeKor, datumUla, statusKor, ocjena },
        isExchangeAvailable: namjena === "prodaja" ? "u prodaji" : namjena,
        obrisanoTime: null
    };

    if (namjena === "prodaja") {
        ticket.price = parseInt(price);
        ticket.buyer = null;
    } else if (namjena === "razmjena") {
        ticket.wantedEventName = wantedEventName;
        ticket.wantedLocation = wantedLocation;
        ticket.wantedDate = wantedDate;
        ticket.wantedSeatNumber = wantedSeatNumber ? parseInt(wantedSeatNumber) : null;
        ticket.wantedTicketType = wantedTicketType || null;
    } else if (namjena === "aukcija") {
        ticket.startPrice = parseInt(startPrice);
        ticket.duration = new Date(duration).toISOString();
    }

    const endpoint = {
        "prodaja": `${backendUrl}/api/sales`,
        "razmjena": `${backendUrl}/api/exchanges`,
        "aukcija": `${backendUrl}/api/auctions`
    }[namjena];

    if (namjena === "aukcija") {
        const userConfirmed = window.confirm("Upozorenje: aukcija se u budućnosti ne može povući, želite li nastaviti?");
        if (!userConfirmed) {
            //console.log("Odbijen zahtjev");
            return;
        }
    }

    setIsPending(true);

    if (namjena === "razmjena") {
        fetch(endpoint, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(ticket),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add ticket");
                }
                return response.json(); 
            })
            .then(data => {
                //console.log("ID", data); 
                setPomoc(data);
                setTimeout(() => {
                    navigate(`/profile`);
                }, 1500); 
                
            })
            .catch(error => {
                console.error("Error while adding the ticket:", error);
                setIsPending(false);
            });
        } else {
            fetch(endpoint, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}` 
                },
                body: JSON.stringify(ticket),
            })
            .then(() => {
                setTimeout(() => { 
                    //console.log('New ticket added');
                    navigate('/profile'); 
                }, 1500);
            })
            .catch(error => {
                //console.error("Error while adding the ticket:", error);
                setIsPending(false);
            });
            
        }
  }
  
    return (
        <div className="create">
            <h2>Dodaj novu ulaznicu</h2>
            <form onSubmit={handleSubmit}>

                <label>Namjena:</label>
                <select value={namjena} onChange={(e) => {setNamjena(e.target.value);}} required>
                    <option value="">Odaberite namjenu karte</option>
                    <option value="prodaja">Prodaja</option>
                    <option value="razmjena">Razmjena</option>
                    <option value="aukcija">Aukcija</option>
                </select>

                <label>Vrsta događaja:</label>
                <select value={nazVrDog} onChange={handleEventTypeChange} required>
                    <option value="">Odaberite vrstu događaja</option>
                    {dogadaji.map(dogadaj => (
                        <option key={dogadaj.id} value={dogadaj.nazVrDog}>
                            {dogadaj.nazVrDog}
                        </option>
                    ))}
                </select>

                <label>Naziv događaja:</label>
                <input 
                    type="text" 
                    required 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)}
                />
  
                {nazVrDog === "Glazba" && (
                    <>
                        <label>Ime izvođača:</label>
                        <input 
                            type="text" 
                            required 
                            value={artistName}
                            onChange={(e) => setartistName(e.target.value)}
                        />
                    </>
                )}

                {namjena === "prodaja" && (
                    <>
                        <label>Cijena (EUR):</label>
                        <input 
                            type="text" 
                            required
                            value={price} 
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setWarnings(prev => ({ ...prev, price: validatePrice(e.target.value) }));
                                //console.log(warnings);
                            }}     
                        />
                        {warnings.price && <p className="warning">{warnings.price}</p>}
                    </>
                )}

                {namjena === "aukcija" && (
                    <>
                        <label>Početna cijena (EUR):</label>
                        <input 
                            type="text" 
                            required 
                            value={startPrice} 
                            onChange={(e) => {
                                setStartPrice(e.target.value);
                                setWarnings(prev => ({ ...prev, startPrice: validateStartPrice(e.target.value) }));
                            }} 
                        />
                        {warnings.startPrice && <p className="warning">{warnings.startPrice}</p>}

                        <label>Trajanje aukcije (krajnji datum):</label>
                        <input 
                            type="date" 
                            required 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </>
                )}

                <label>Mjesto:</label>
                <input 
                    type="text" 
                    required 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                />

                <label>Datum:</label>
                <input 
                    type="date" 
                    required 
                    value={eventDate} 
                    onChange={(e) => setEventDate(e.target.value)}
                    min= {minDate}
                />

                <label>Vrsta ulaznice:</label>
                <input 
                    type="text"  
                    value={ticketType} 
                    onChange={(e) => {
                        setTicketType(e.target.value);
                        setWarnings(prev => ({ ...prev, ticketType: validateTicketType(e.target.value) }));
                    }}
                />
                {warnings.ticketType && <p className="warning">{warnings.ticketType}</p>}

                <label>Broj sjedala:</label>
                <input 
                    type="text"  
                    value={seatNumber} 
                    onChange={(e) => {
                        setSeatNumber(e.target.value);
                        setWarnings(prev => ({ ...prev, seatNumber: validateSeatNumber(e.target.value) }));
                    }}
                />
                {warnings.seatNumber && <p className="warning">{warnings.seatNumber}</p>}


                {namjena === "razmjena" && (
                    <>
                        <label>Željeni naziv oglasa:</label>
                        <input 
                            type="text" 
                            required 
                            value={wantedEventName} 
                            onChange={(e) => setwantedEventName(e.target.value)}
                        />

                        <label>Željeno mjesto:</label>
                        <input 
                            type="text" 
                            required 
                            value={wantedLocation} 
                            onChange={(e) => setwantedLocation(e.target.value)}
                        />

                        <label>Željeni datum:</label>
                        <input 
                            type="date" 
                            required 
                            value={wantedDate} 
                            onChange={(e) => setwantedDate(e.target.value)}
                            
                        />

                        <label>Željeni broj sjedala:</label>
                        <input 
                            type="text" 
                            value={wantedSeatNumber} 
                            onChange={(e) => {
                                setwantedSeatNumber(e.target.value);
                                setWarnings(prev => ({ ...prev, wantedSeatNumber: validateWantedSeatNumber(e.target.value) }));
                            }}
                        />
                        {warnings.wantedSeatNumber && <p className="warning">{warnings.wantedSeatNumber}</p>}

                        <label>Željena vrsta ulaznice:</label>
                        <input 
                            type="text" 
                            value={wantedTicketType} 
                            onChange={(e) => {
                                setwantedTicketType(e.target.value);
                                setWarnings(prev => ({ ...prev, wantedTicketType: validateWantedTicketType(e.target.value) }));
                            }}
                        />
                        {warnings.wantedTicketType && <p className="warning">{warnings.wantedTicketType}</p>}
                    </>
                )}

                {!isPending && <button>Dodaj ulaznicu</button>}
                {isPending && <button disabled>Dodavanje ulaznice...</button>}
            </form>
        </div>
    );
    
}

export default Create;
