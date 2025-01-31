import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/Create.css';

const EditTicket = () => {
    const lokacija = useLocation();
    const ticket = lokacija.state?.ticket;
    const [dogadaji, setDogadaji] = useState([]);
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [seatNumber, setSeatNumber] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [nazVrDog, setnazVrDog] = useState('');
    const [eventTypeId, setEventTypeId] = useState('');
    const [ticketId, setTicketId] = useState('');
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

    const [pomoc, setPomoc] = useState('');
    const [idrazmjena, setIdRazmjena] = useState('');

    useEffect(() => {
        if (ticket) {
            setEventName(ticket.eventName);
            setLocation(ticket.location);
            setEventDate(ticket.eventDate);
            setSeatNumber(ticket.seatNumber);
            setTicketType(ticket.ticketType);
            setnazVrDog(ticket.eventTypeId.nazVrDog);
            setEventTypeId(ticket.eventTypeId.id);
            setNamjena(ticket.isExchangeAvailable)
            setartistName(ticket.artistName);
            if (ticket.id) setTicketId(ticket.id);
        }
        if (namjena === "aukcija") {
            setStartPrice(ticket.startPrice);
            setDuration(ticket.duration);
        } else if (namjena === "razmjena") {
            setwantedEventName(ticket.wantedEventName);
            setwantedLocation(ticket.wantedLocation);
            setwantedDate(ticket.wantedDate);
            setwantedSeatNumber(ticket.wantedSeatNumber);
            setwantedTicketType(ticket.wantedTicketType);
        }
        else if (namjena === "prodaja") {
            setPrice(ticket.price);
        }
    }, [ticket, namjena]);

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
                                                sendEmail(userEmail,ticket);
                                            });
                                    });
                                });
                        });
                    });
    
                    alert("Uspješno pronađen lanac zamjene! Emailovi su poslani svim korisnicima u lancu.");
                });
        }
    }, [idrazmjena,backendUrl,access_token]);

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

        console.log(namjena);
        let newticket = {
                id: ticketId,
                eventTypeId: { id: eventTypeId, nazVrDog: nazVrDog },
                eventName,
                eventDate: new Date(eventDate).toISOString().split('T')[0],
                location,
                seatNumber: seatNumber ? parseInt(seatNumber) : null,
                ticketType: ticketType || null,
                artistName: nazVrDog === "Glazba" ? artistName : null,
                owner: { id: localStorage.getItem("userID"), email, imeKor, prezimeKor, datumUla, statusKor, ocjena },
                isExchangeAvailable: namjena === "prodaja" ? "u prodaji" : namjena,
                obrisanoTime: null
        };

       
        if (namjena === "prodaja") {
            newticket.price = parseInt(price);
            newticket.buyer = null;
        } else if (namjena === "razmjena") {
            newticket.wantedEventName = wantedEventName;
            newticket.wantedLocation = wantedLocation;
            newticket.wantedDate = wantedDate;
            newticket.wantedSeatNumber = wantedSeatNumber ? parseInt(wantedSeatNumber) : null;
            newticket.wantedTicketType = wantedTicketType || null;
        } else if (namjena === "aukcija") {
            newticket.startPrice = parseInt(startPrice);
            newticket.duration = new Date(duration).toISOString();
        }

        if (!ticket.id) {
            console.error("Ticket ID is missing. This might be a new ticket.");
            return;
        }

        console.log("Ticket payload:", JSON.stringify(ticket));

        const endpoint = {
            "u prodaji": `${backendUrl}/api/sales/${ticket.id}`,
            "razmjena": `${backendUrl}/api/exchanges/${ticket.id}`,
            "aukcija": `${backendUrl}/api/auctions/${ticket.id}`
        }[namjena];
        console.log("endpoint", endpoint)
        console.log("new", newticket);

        setIsPending(true);

        fetch(endpoint, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}` 
            },
            body: JSON.stringify(newticket),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to change ticket");
                }
                return response.json(); 
            })
            .then(data => {
                if (namjena === "razmjena"){
                    setPomoc(data);
                }
                setTimeout(() => { 
                    console.log('Ticket updated');
                    navigate(-1); 
                    }, 1500);

                console.log("edit-data:",data);

            }).catch(error => {
                console.error("Error while updating the ticket:", error);
                setIsPending(false);
            });       
  }
    return (
        <div className="create">
            <h2>Uredi ulaznicu</h2>
            <form onSubmit={handleSubmit}>

                <label>Namjena:</label>
                <input type="text" value={namjena} disabled />

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
                                console.log(warnings);
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

                {!isPending && <button>Spremi promjene</button>}
                {isPending && <button disabled>Spremam promjene...</button>}
            </form>
        </div>
    );
    
}
export default EditTicket;