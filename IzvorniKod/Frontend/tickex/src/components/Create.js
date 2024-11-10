import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Create.css';

const Create = () => {
    const [eventName, setEventName] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [eventDate, setEventDate] = useState('');
    const [seatNumber, setSeatNumber] = useState(''); 
    const [ticketType, setTicketType] = useState(''); 
    const [nazVrDog, setnazVrDog] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const access_token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("profile_id");
      
        if (!userId) {
            console.error("User ID nije pronađen u localStorage");
            return;
        }
    
        const ticket = { 
            id: 6,
            eventTypeId: { id: 7, nazVrDog },
            eventName, 
            location, 
            eventDate, 
            seatNumber, 
            ticketType, 
            price, 
            isExchangeAvailable: false, 
            owner: { 
                id: userId, 
                email: "laura.barisic.hr@gmail.com", 
                imeKor: "Laura", 
                prezimeKor: "Barišić", 
                datumUla: "2024-11-08"
            },
            exchangeAvailable: false
        };
    
        setIsPending(true);
    
        fetch(`http://localhost:8080/api/tickets?access_token=${access_token}`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json" },
            body: JSON.stringify(ticket)
        }).then(() => {
            setTimeout(() => { 
                console.log('New ticket added');
                setIsPending(false);
                navigate('/profile'); 
            }, 1500);
        }).catch(error => {
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

                <label>Broj sjedala:</label>
                <input 
                    type="text"  
                    value={seatNumber} 
                    onChange={(e) => setSeatNumber(e.target.value)}
                />

                <label>Vrsta događaja:</label>
                <select
                    value={nazVrDog}
                    onChange={(e) => setnazVrDog(e.target.value)}
                >
                    <option value="Glazba">glazba</option> 
                    <option value="Nogomet">nogomet</option>
                    <option value="Kazalište">kazalište</option>
                    <option value="Kino">kino</option>
                    <option value="Tenis">tenis</option>
                    <option value="Muzej">muzej</option>
                </select>

                <label>Vrsta ulaznice:</label>
                <select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value)}
                >
                    <option value="Normal">normal</option>
                    <option value="VIP">VIP</option>
                    <option value="Fan Pit">Fan Pit</option>
                </select>

                <label>Cijena (EUR):</label>
                <input 
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
