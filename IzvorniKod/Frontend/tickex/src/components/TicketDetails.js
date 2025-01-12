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
    //Za vrijeme
    const [weatherData, setWeatherData] = useState({})
    const [weatherLocation, setWeatherLocation] = useState('')
    //Like image
    const [likeImage, setLikeImage] = useState("../images/unlike.png");  // Initial image is 'unlike'
    //Za artista
    const [eventType, setEventType] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [artistData, setArtistData] = useState({})

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
            setEventType(ticket.eventTypeId.nazVrDog);
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

    useEffect(() => {
        if (eventType === 'Glazba') {
            setArtistSearch(ticket.artistName)
        }
    }, [eventType]);

    const artistSearchToken = "htgBjiTrQMVOEEhWSSiWXEHDxIYVEDNpibEUWEkY"
    const searchArtistFunc = async () => {
        const artistAPI_ID = `https://api.discogs.com/database/search?token=${artistSearchToken}&type=artist&q=${artistSearch}`;
        const resArtist_ID = await fetch(artistAPI_ID)
        const searchArtistData_ID = await resArtist_ID.json()
        const artistID = searchArtistData_ID.results[0] ? searchArtistData_ID.results[0].id : null
        if (artistID != null){
            const artistAPI = `https://api.discogs.com/artists/${artistID}`
            const resArtist = await fetch(artistAPI)
            const searchArtistData = await resArtist.json()
            setArtistData(searchArtistData)
        }
    };

    useEffect(() => {
        if (artistSearch) {
            searchArtistFunc()
        }
    }, [artistSearch]);

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
                            <img 
                                    className="like" 
                                    src={likeImage} 
                                    alt="like" 
                                    onClick={handleLikeClick}
                                />
                        </div>
                        <div className="ticket-info">
                            <br/>
                            <p>
                                <div>
                                    <span>Mjesto:</span> <span className="answer">{ticket.location}</span>
                                </div>
                                <div>
                                    <span>Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span>
                                </div>
                                <div>
                                    <span>Vrsta ulaznice:</span> <span className="answer">{ticket.ticketType !== null ? ticket.ticketType : "-"}</span>
                                </div>
                                <div>
                                    <span>Status:</span> <span className="answer">{ticket.isExchangeAvailable}</span>
                                </div>
                                {ticket.isExchangeAvailable === "prodaja" && (
                                    <div>
                                    <span>Cijena:</span> <span className="answer">{ticket.price} €</span>
                                    </div>
                                )}
                                {ticket.isExchangeAvailable === "aukcija" && (
                                    <div>
                                    <span>Početna cijena:</span> <span className="answer">{ticket.startPrice} €</span>
                                    </div>
                                )}
                                <div>
                                    <span>Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span>
                                </div>
                                <div>
                                    <span>Broj sjedala:</span> <span className="answer">{ticket.seatNumber !== null ? ticket.seatNumber : "-"}</span>
                                </div>
                                <div>
                                    <span>Izbrisana:</span> <span className="answer">{ticket.obrisanoTime !== null ? ticket.obrisanoTime : "-"}</span>
                                </div>
                                <div>
                                    <span>Vrijeme:</span>
                                    <span className="answer">
                                    {weatherData?.days
                                        ? getDaysDifference(ticket.eventDate) >= 0 && getDaysDifference(ticket.eventDate) < 15
                                        ? weatherData?.days?.[Math.ceil(getDaysDifference(ticket.eventDate))]?.conditions || "-"
                                        : "-"
                                        : "-"}
                                    </span>
                                </div>
                                <div>
                                    <span>Prosj. Temperatura:</span>
                                    <span className="answer">
                                    {weatherData?.days
                                        ? getDaysDifference(ticket.eventDate) >= 0 && getDaysDifference(ticket.eventDate) < 15
                                        ? weatherData?.days?.[Math.ceil(getDaysDifference(ticket.eventDate))]?.temp + "°C" || "-"
                                        : "-"
                                        : "-"}
                                    </span>
                                </div>
                                {ticket.eventTypeId.nazVrDog === 'Glazba' && (
                                    <>
                                    <div>
                                        <span>Artits:</span> <span>{ticket.artistName}</span>
                                    </div>
                                    <div>
                                        <span>Artist info:</span> <span id="artistProfile">{artistData.profile ? artistData.profile : "-"}</span>
                                    </div>
                                    </>
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
