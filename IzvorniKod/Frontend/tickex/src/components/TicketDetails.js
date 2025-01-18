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
    const [rating, setRating] = useState(0);

    const [weatherData, setWeatherData] = useState({})
    const [weatherLocation, setWeatherLocation] = useState('')

    const [likeImage, setLikeImage] = useState("../images/unlike.png");  

    const [eventType, setEventType] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [artistData, setArtistData] = useState({})

    const userID = localStorage.getItem("userID");
    
    const { data: favorites, isFavsPending, favsError } = useFetch(`${backendUrl}/api/favorites?userId=${parseInt(localStorage.getItem("userID"))}`);
    
   
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (userID && favorites) {
            const isLiked = favorites.some(fav => fav.id === parseInt(id)); 
            setLikeImage(isLiked ? "../images/like.png" : "../images/unlike.png");
        }
    }, [favorites, id]);  
    

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
    

    const handleReportClick = async (ticket, navigate) => {
        try {
            navigate('/reports', { state: { ticket } });
        } catch (error) {
            console.error("Error navigating to reports:", error);
        }
      };

    const api_key = 'JYLAZZ9VPACY4FFAAYWSEDJDJ'
    const searchWeather = async () => {
        const urlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}?unitGroup=metric&include=days&key=${api_key}&contentType=json`
        const resWeather = await fetch(urlWeather)
        if(resWeather.status == 200){
            const searchWeatherData = await resWeather.json()
            setWeatherData(searchWeatherData)
        }
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

    const handleEditTicket = async (ticket) => {
        try {
            navigate(`/edit-ticket`, { state: { ticket } });
        } catch (error) {
            console.error("Cannot edit ticket:", error);
        }
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

    const handleRating = async () => {
        const access_token = localStorage.getItem("access_token");
        try {
          const response = await fetch(`${backendUrl}/api/users/rate/${rating}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
          });
      
          const isRated = await response.json();
      
          if (isRated) {
            alert("Rating submitted successfully!");
          } else {
            alert("You have already rated this user.");
          }
        } catch (error) {
          console.error("Error occurred while submitting rating:", error);
          alert("An error occurred while submitting the rating.");
        }
      };
      const handleLikeClick = () => {
        setLikeImage(likeImage === "../images/unlike.png" ? "../images/like.png" : "../images/unlike.png");
    
        const userID = localStorage.getItem("userID");
        const access_token = localStorage.getItem("access_token");
    
        if (likeImage === "../images/unlike.png") {
            fetch(`${backendUrl}/api/favorites`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ticketId: id,
                    userId: userID
                })
            })
            .then(response => response.json()) 
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);  
                setLikeImage("../images/unlike.png");  
            });
        } else if (likeImage === "../images/like.png") {
            fetch(`${backendUrl}/api/favorites`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ticketId: id,
                    userId: userID
                })
            })
            .then(response => response.json())  
            .then(data => {
                console.log('Response:', data);
                navigate(-1);
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);  
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
                            {userID && (<div className="images">
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
                                    onClick={() => handleEditTicket(ticket)}
                                />
                            </div>)}
                        </div>
                        <div className="ticket-info">
                            <br/>
                            <div className="div-p">
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
                                        <span>Artist:</span> <span id="artistName">{ticket.artistName}</span>
                                    </div>
                                    <div>
                                        <span>Artist info:</span> <span id="artistProfile">{artistData.profile ? artistData.profile : "-"}</span>
                                    </div>
                                    </>
                                )}
                            </div>
                            <br/>
                            <p className="ticket-posted-by">Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}</p>
                            {ticket.isExchangeAvailable === "prodano" && ticket.owner.id !== parseInt(userID) && (
                                <div>Email: {ticket.owner.email}</div>
                            )}
                            {ticket.owner.id !== parseInt(userID) && ticket.isExchangeAvailable === "prodano" && (
                            <div className="ticket-rating">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= rating ? "selected" : ""}`}
                                            onClick={() => setRating(star)}
                                            style={{
                                            cursor: "pointer",
                                            fontSize: "24px",
                                            color: star <= rating ? "yellow" : "lightgray",
                                    }}
                                >
                                ★
                                    </span>
                                ))}
                            </div>
                            <button onClick={handleRating}>Submit Rating</button>
                            </div>
                            )}
                            <StarRate ocjena={ticket.owner.ocjena} />
                            <div className="button-container">
                                {canDelete && <button onClick={handleDelete} className="delete-button">Obriši kartu</button>}
                                {canBringBack && <button onClick={handleBack} className="delete-button">Vrati</button>}
                                <button className="btn-buy" onClick={() => handleReportClick(ticket, navigate)}>
                                    Prijavi
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default TicketDetails;
