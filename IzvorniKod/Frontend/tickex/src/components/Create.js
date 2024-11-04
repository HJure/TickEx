import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Create.css';

const Create = () => {
    const [nazDog, setnazDog] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [datum, setDatum] = useState('');
    const [brSj, setBrSj] = useState('');
    const [vrsUla, setVrsUla] = useState('');
    const [vrsDog, setVrsDog] = useState('');
    const [cijena, setCijena] = useState('');
    const [status, setStatus] = useState(false);
    const [idProdavac, setidProdavac] = useState('me');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticket = { nazDog, mjesto, datum, brSj, vrsDog, status, cijena, idProdavac };
        
        setIsPending(true);

        fetch('http://localhost:8000/tickets', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticket)
        }).then(() => {
            setTimeout(() => { 
                console.log('new ticket added');
                setIsPending(false);
                navigate('/profile'); 
            }, 1500);
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
                    value={nazDog} 
                    onChange={(e) => setnazDog(e.target.value)}
                />

                <label>Mjesto:</label>
                <input 
                    type="text" 
                    required 
                    value={mjesto} 
                    onChange={(e) => setMjesto(e.target.value)}
                />

                <label>Datum:</label>
                <input 
                    type="date" 
                    required 
                    value={datum} 
                    onChange={(e) => setDatum(e.target.value)}
                />

                <label>Broj sjedala:</label>
                <input 
                    type="text"  
                    value={brSj} 
                    onChange={(e) => setBrSj(e.target.value)}
                />

                <label>Vrsta događaja:</label>
                <select
                    value={vrsDog}
                    onChange={(e) => setVrsDog(e.target.value)}
                >
                    <option value="Glazba">glazba</option>
                    <option value="Nogomet">nogomet</option>
                    <option value="Kazaliste">kazalište</option>
                    <option value="Kino">kino</option>
                    <option value="Tenis">tenis</option>
                    <option value="Muzej">muzej</option>
                </select>

                <label>Vrsta ulaznice:</label>
                <select
                    value={vrsUla}
                    onChange={(e) => setVrsUla(e.target.value)}
                >
                    <option value="Normal">normal</option>
                    <option value="VIP">VIP</option>
                    <option value="Fan Pit">Fan Pit</option>
                </select>

                <label>Cijena (EUR):</label>
                <input 
                    type="text"  
                    value={cijena} 
                    onChange={(e) => setCijena(e.target.value)}
                />

                {!isPending && <button>Add ticket</button>}
                {isPending && <button disabled>Adding ticket...</button>}
            </form>
        </div>
    );
}

export default Create;
