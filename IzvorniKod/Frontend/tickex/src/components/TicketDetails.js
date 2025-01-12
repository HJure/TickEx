import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/ticket-details.css';
import StarRate from "./StarRate";

const TicketDetails = ({ url }) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const { id } = useParams();
    const { data: ticket, error, isPending } = useFetch(`${url}/${id}`);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const [canDelete, setCanDelete] = useState(false);
    const [canBringBack, setBringBack] = useState(false);
    const [weatherData, setWeatherData] = useState({})
    const [weatherLocation, setWeatherLocation] = useState('')
    const [likeImage, setLikeImage] = useState("../images/unlike.png");  // Initial image is 'unlike'
    
    /*const [eventType, setEventType] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [artistData, setArtistData] = useState({})*/
    //OVDJE

    // State for like button image
    
    const { data: favorites, isFavsPending, favsError } = useFetch(`${backendUrl}/api/favorites?userId=${parseInt(localStorage.getItem("userID"))}`);
    
   
    useEffect(() => {
        if (favorites && favorites.length > 0) {
            // Check if the ticketId is in the list of favorites 
            const isLiked = favorites.some(fav => fav.ticketId === parseInt(id));
            // If liked, change the image to 'like.png', otherwise 'unlike.png'
            setLikeImage(isLiked ? "../images/like.png" : "../images/unlike.png");
        } else {
            // If no favorites, set to the default 'unlike' image
            setLikeImage("../images/unlike.png");
        }
    }, [favorites, id]); // Only rerun when 'favorites' or 'ticketId' changes

    useEffect(() => {
        const userID = localStorage.getItem("userID"); 
        if (ticket && userID) {
            setCanDelete(ticket.owner.id === parseInt(userID) && ["u prodaji", "aukcija", "razmjena"].includes(ticket.isExchangeAvailable));
            setBringBack(ticket.owner.id === parseInt(userID) && ticket.isExchangeAvailable === "obrisano");
        }

        if(ticket){
            setWeatherLocation(ticket.location);
            //setEventType(ticket.eventTypeId.nazVrDog);
            //OVDJE
        }
    }, [ticket]);

    const api_key = 'JYLAZZ9VPACY4FFAAYWSEDJDJ'
    const searchWeather = async () => {
        const urlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}?unitGroup=metric&include=days&key=${api_key}&contentType=json`
        const resWeather = await fetch(urlWeather)
        const searchWeatherData = await resWeather.json()
        setWeatherData(searchWeatherData)
    };

    useEffect(() => {
        if (weatherLocation) {
            searchWeather()
        }
    }, [weatherLocation]);

    /*useEffect(() => {
        if (eventType === 'Glazba') {
            setArtistSearch(ticket.eventName)
        }
    }, [eventType]);

    useEffect(() => {
        if (artistSearch) {
            //nešto
        }
    }, [artistSearch]);*/
    //OVDJE

    const getDaysDifference = (ticketDate) => {
        const today = new Date();
        const ticketDateObj = new Date(ticketDate);
        const diffTime = ticketDateObj - today;
        const diffDays = diffTime / (1000 * 3600 * 24);
  
        return diffDays;
    };

    const handleDelete = () => {
        const deleteUrl = `${url}/${id}/status`.replace(/([^:]\/)\/+/g, "$1"); 
        const access_token = localStorage.getItem("access_token"); 
    
        fetch(deleteUrl, {
            method: 'PUT',
            headers: { 
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "obrisano" })
        })
        .then(() => {
            console.log('Ticket deleted');
            setIsDeleting(true); 
            setTimeout(() => {
                navigate('/profile'); 
            }, 1500);
        })
        .catch(error => {
            console.error("Greška prilikom brisanja karte:", error);
            setIsDeleting(false);
        });
    };

    const handleBack = () => {
        let newStatus = "u prodaji";
        if (ticket.price > 0) {
            newStatus = "u prodaji";
        } else if (ticket.wantedEventName) {
            newStatus = "razmjena";
        } else if (ticket.startPrice > 0) {
            newStatus = "aukcija";
        }
     
        const updateUrl = `${url}/${id}/status`.replace(/([^:]\/)\/+/g, "$1"); 
        const access_token = localStorage.getItem("access_token"); 
    
        fetch(updateUrl, {
            method: 'PUT',
            headers: { 
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(() => {
            console.log('Ticket status updated');
            setBringBack(true); 
            setTimeout(() => {
                navigate('/profile'); 
            }, 1500);
        })
        .catch(error => {
            console.error("Greška prilikom ažuriranja karte:", error);
            setBringBack(false);
        });
    };

    const handleLikeClick = () => {
        //if like image === like.png DELETE ../tickets/{ticket_id}/favorite i setLikeImage unlike.png
        //inace POST na ../tickets/{ticket_id}/favorite i setLikeImage like.png
        // treba u body poslati userID kojeg backend uzima kao Integer
        
        setLikeImage(likeImage === "../images/unlike.png" ? "../images/like.png" : "../images/unlike.png");
        console.log(likeImage === "../images.like.png");
        if (likeImage === "../images/unlike.png"){
            const userID = localStorage.getItem("userID");
            const access_token = localStorage.getItem("access_token"); 
            fetch (`${backendUrl}/api/favorites`,{
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ticketId: id,
                    userId: userID
                })
            })  .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage); // Use the message from the backend
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Ticket favorited');
            })
            .catch(error => {
                console.error('Error:', error.message);  
                
                if(error.message === "Error: Oglas vise nije aktivan"){
                    
                    alert(error.message);  
                    setLikeImage("../images/unlike.png");
                }
                if(error.message === "Error: Nemoguce lajkati svoj oglas"){
                    
                    alert(error.message);  
                    setLikeImage("../images/unlike.png");
                }
            });
        }else if(likeImage === "../images/like.png"){
            const userID = localStorage.getItem("userID");
            const access_token = localStorage.getItem("access_token"); 
            fetch (`${backendUrl}/api/favorites`,{
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ticketId: id,
                    userId: userID
                })
            })  .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage); // Use the message from the backend
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Ticket removed from favorites');
            })
            .catch(error => {
                console.error('Error:', error.message);  
                
            });
        }
    };
    

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <>
            <img className="backward" src="../images/left-chevron.png" alt="arrow" onClick={goBack}/>
            <div className="ticket-details">
                {isPending && <div>Učitavam...</div>}
                {isDeleting && <div>Brišem kartu...</div>}
                {canBringBack && <div>Vraćam kartu...</div>} 
                {error && <div>Greška: {error}</div>}
                {ticket && (
                    <div className="ticket-content">
                        <div className="title">
                            <h2>
                                {ticket.eventName} 
                            </h2>
                            <div className="images">
                                <img 
                                        className="like" 
                                        src={likeImage} 
                                        alt="like" 
                                        onClick={handleLikeClick}
                                    />
                                <img
                                    className="edit"
                                    src="../images/editIcon.png"
                                    alt="edit"
                                />
                            </div>
                        </div>
                        <div className="ticket-info">
                            <br/>
                            <p>
                                <span>Mjesto:</span> <span className="answer">{ticket.location}</span>
                                <span>Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span>
                                <span>Vrsta ulaznice:</span> <span className="answer"> {ticket.ticketType !== null ? ticket.ticketType : "-"}</span>
                                <span>Status:</span> <span className="answer">{ticket.isExchangeAvailable}</span>
                                {ticket.isExchangeAvailable === "prodaja" && <><span>Cijena:</span> <span className="answer">{ticket.price} €</span></>}
                                {ticket.isExchangeAvailable === "aukcija" && <><span>Početna cijena:</span> <span className="answer">{ticket.startPrice} €</span></>}
                                <span>Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span>
                                <span>Broj sjedala:</span> <span className="answer">{ticket.seatNumber !== null ? ticket.seatNumber : "-"}</span>
                                <span>Izbrisana:</span> <span className="answer">{ticket.obrisanoTime !== null ? ticket.obrisanoTime : "-"}</span>
                                <span>
                                    Vrijeme: 
                                </span>
                                <span className="answer">
                                    {
                                        weatherData?.days?
                                            (getDaysDifference(ticket.eventDate) >= 0 && getDaysDifference(ticket.eventDate) < 15 ? weatherData?.days?.[Math.ceil(getDaysDifference(ticket.eventDate))]?.conditions || "-" : "-") : "-"
                                    }
                                </span>

                                {ticket.eventTypeId.nazVrDog === 'Glazba' && (
                                <span>
                                    Artits: Zasada ignoriraj ovo, ovo je priprema 
                                    <img src="path/to/your/image.jpg" alt="Artist" />
                                </span>
                                )}

                            </p>
                            <br/>
                            <p className="ticket-posted-by">Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}</p>
                            <StarRate ocjena={ticket.owner.ocjena} />
                            {canDelete && <button onClick={handleDelete} className="delete-button">Obriši kartu</button>}
                            {canBringBack && <button onClick={handleBack} className="delete-button">Vrati</button>}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default TicketDetails;
