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
    const [namjena, setNamjena] = useState('');
    const [pocCijena, setPocCijena] = useState('');
    const [trajanje, setTrajanje] = useState('');
    const [zeljeniNazOgl, setZeljeniNazOgl] = useState('');
    const [zeljenoMjesto, setZeljenoMjesto] = useState('');
    const [zeljeniDatum, setZeljeniDatum] = useState('');
    const [zeljeniBrSje, setZeljeniBrSje] = useState('');
    const [zeljenaVrsUla, setZeljenaVrsUla] = useState(null);
    const [imeIzvodaca, setImeIzvodaca] = useState('');

    const navigate = useNavigate();

    const email = localStorage.getItem("user_email");
    const access_token = localStorage.getItem("access_token");
    const imeKor = localStorage.getItem("user_first_name");
    const prezimeKor = localStorage.getItem("user_last_name");
    const datumUla = localStorage.getItem("user_registration_date");

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

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

        const ticket = {
            eventTypeId: { id: eventTypeId },
            eventName,
            location,
            eventDate: new Date(eventDate).toISOString(),
            seatNumber: seatNumber ? parseInt(seatNumber) : null,
            ticketType: ticketType || null,
            owner: { id: localStorage.getItem("userID"), email, imeKor, prezimeKor, datumUla },
            isExchangeAvailable: namjena === "prodaja" ? "u prodaji" : namjena,
            price: namjena === "prodaja" ? parseInt(price) : null,
            /*pocCijena: namjena === "aukcija" ? parseInt(pocCijena) : null,
            trajanje: namjena === "aukcija" ? new Date(trajanje).toISOString() : null,
            zeljeniNazOgl: namjena === "razmjena" ? zeljeniNazOgl : null,
            zeljenoMjesto: namjena === "razmjena" ? zeljenoMjesto : null,
            zeljeniDatum: namjena === "razmjena" ? new Date(zeljeniDatum).toISOString() : null,
            zeljeniBrSje: namjena === "razmjena" ? zeljeniBrSje : null,
            zeljenaVrsUla: namjena === "razmjena" ? zeljenaVrsUla : null,
            imeIzvodaca*/
        };

        setIsPending(true);

        fetch(`${backendUrl}/api/tickets`, {
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
  
                {nazVrDog === "Glazba" && (
                    <>
                        <label>Ime izvođača:</label>
                        <input 
                            type="text" 
                            required 
                            value={imeIzvodaca}
                            onChange={(e) => setImeIzvodaca(e.target.value)}
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
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </>
                )}

                {namjena === "aukcija" && (
                    <>
                        <label>Početna cijena (EUR):</label>
                        <input 
                            type="text" 
                            required 
                            value={pocCijena} 
                            onChange={(e) => setPocCijena(e.target.value)}
                        />

                        <label>Trajanje aukcije (krajnji datum):</label>
                        <input 
                            type="date" 
                            required 
                            value={trajanje} 
                            onChange={(e) => setTrajanje(e.target.value)}
                        />
                    </>
                )}

                {namjena === "razmjena" && (
                    <>
                        <label>Željeni naziv oglasa:</label>
                        <input 
                            type="text" 
                            required 
                            value={zeljeniNazOgl} 
                            onChange={(e) => setZeljeniNazOgl(e.target.value)}
                        />

                        <label>Željeno mjesto:</label>
                        <input 
                            type="text" 
                            required 
                            value={zeljenoMjesto} 
                            onChange={(e) => setZeljenoMjesto(e.target.value)}
                        />

                        <label>Željeni datum:</label>
                        <input 
                            type="date" 
                            required 
                            value={zeljeniDatum} 
                            onChange={(e) => setZeljeniDatum(e.target.value)}
                        />

                        <label>Željeni broj sjedala:</label>
                        <input 
                            type="text" 
                            value={zeljeniBrSje} 
                            onChange={(e) => setZeljeniBrSje(e.target.value)}
                        />

                        <label>Željena vrsta ulaznice:</label>
                        <input 
                            type="text" 
                            value={zeljenaVrsUla} 
                            onChange={(e) => setZeljenaVrsUla(e.target.value)}
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

                {!isPending && <button>Dodaj ulaznicu</button>}
                {isPending && <button disabled>Dodavanje ulaznice...</button>}
            </form>
        </div>
    );
}

export default Create;
