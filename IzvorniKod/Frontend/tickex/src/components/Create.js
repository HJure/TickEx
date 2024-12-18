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
    const [eventTypeId, setEventTypeId] = useState(null);
    const [price, setPrice] = useState('');
    const [warnings, setWarnings] = useState({});
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const email = localStorage.getItem("user_email");
    const access_token = localStorage.getItem("access_token");
    const imeKor = localStorage.getItem("user_first_name");
    const prezimeKor = localStorage.getItem("user_last_name");
    const datumUla = localStorage.getItem("user_registration_date");
    const isExchangeAvailable = false;

    useEffect(() => {
        const fetchVrDog = async () => {
            try {
                const response = await fetch(`https://backend-3qyr.onrender.com/api/vrsta-dogadaja`, {
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
    }, []);

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

        if (priceWarning || seatNumberWarning || ticketTypeWarning) {
            setWarnings({ price: priceWarning, seatNumber: seatNumberWarning, ticketType: ticketTypeWarning });
            return;
        }

        const ticket = {
            eventTypeId: { id: eventTypeId },
            eventName,
            location,
            eventDate: new Date(eventDate).toISOString(),
            seatNumber: seatNumber ? parseInt(seatNumber) : null,
            ticketType: ticketType || null,
            price: parseInt(price),
            owner: { id: localStorage.getItem("userID"), email, imeKor, prezimeKor, datumUla },
            isExchangeAvailable,
        };

        setIsPending(true);

        fetch("https://backend-3qyr.onrender.com/api/tickets", {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(ticket)
        })
        .then(() => {
            setTimeout(() => { 
                console.log('New ticket added');
                setIsPending(false);
                navigate('/profile'); 
            }, 1500);
        })
        .catch(error => {
            console.error("Greška prilikom dodavanja karte:", error);
            setIsPending(false);
        });
    };

    return (
        <div className="create">
            <h2>Dodaj novu ulaznicu</h2>
            <form onSubmit={handleSubmit}>
                <label>Naziv događaja:</label>
                <input 
                    type="text" 
                    required 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)}
                />

                <label>Vrsta događaja:</label>
                <select value={nazVrDog} onChange={handleEventTypeChange}>
                    <option value="">Odaberite vrstu događaja</option>
                    {dogadaji.map(dogadaj => (
                        <option key={dogadaj.id} value={dogadaj.nazVrDog}>
                            {dogadaj.nazVrDog}
                        </option>
                    ))}
                </select>

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

                <label>Cijena (EUR):</label>
                <input 
                    type="text"  
                    required 
                    value={price} 
                    onChange={(e) => {
                        setPrice(e.target.value);
                        setWarnings(prev => ({ ...prev, price: validatePrice(e.target.value) }));
                    }}
                />
                {warnings.price && <p className="warning">{warnings.price}</p>}

                {!isPending && <button>Dodaj ulaznicu</button>}
                {isPending && <button disabled>Dodavanje ulaznice...</button>}
            </form>
        </div>
    );
}

export default Create;
