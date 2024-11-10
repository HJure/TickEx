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
                const response = await fetch(`http://localhost:8080/api/vrsta-dogadaja`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
        
                if (!response.ok) {
                    throw new Error('Error while fetching VrDog data');
                }
        
                const data = await response.json();
                setDogadaji(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchVrDog();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const ticket = { 
            eventTypeId: { id: eventTypeId },
            eventName, 
            location, 
            eventDate: new Date(eventDate).toISOString(), 
            seatNumber: seatNumber ? parseInt(seatNumber) : null, 
            ticketType: ticketType || null, 
            price: parseInt(price), 
            owner: { 
                id: localStorage.getItem("userID"), 
                email, 
                imeKor, 
                prezimeKor, 
                datumUla
            },
            isExchangeAvailable
        };
    
        setIsPending(true);
    
        fetch("http://localhost:8080/api/tickets", {
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
    
    const handleEventTypeChange = (e) => {
        const selectedNazVrDog = e.target.value;
        setnazVrDog(selectedNazVrDog);
        
        const selectedDogadaj = dogadaji.find(dogadaj => dogadaj.nazVrDog === selectedNazVrDog);
        setEventTypeId(selectedDogadaj ? selectedDogadaj.id : null);
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
                <select
                    value={nazVrDog}
                    onChange={handleEventTypeChange} 
                >
                    <option value="">Odaberite vrstu događaja</option>
                    {dogadaji.map((dogadaj) => (
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
                    onChange={(e) => setTicketType(e.target.value)}
                />

                <label>Broj sjedala:</label>
                <input 
                    type="text"  
                    value={seatNumber} 
                    onChange={(e) => setSeatNumber(e.target.value)}
                />

                <label>Cijena (EUR):</label>
                <input 
                    required
                    type="text"  
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                />

                {!isPending && <button>Dodaj ulaznicu</button>}
                {isPending && <button disabled>Dodavanje ulaznice...</button>}
            </form>
        </div>
    );
}

export default Create;
