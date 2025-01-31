import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/ticket-details.css';
import { handleBuyClick } from '../utils/buyButton.js';
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
    const [hideImage, setHideImage] = useState("../images/show.png"); 

    const [eventType, setEventType] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [artistData, setArtistData] = useState({})

    const userID = localStorage.getItem("userID");
    
    const { data: favorites} = useFetch(`${backendUrl}/api/favorites?userId=${parseInt(localStorage.getItem("userID"))}`);
    
    const [isRatingVisible, setIsRatingVisible] = useState(false); 
    const toggleRatingVisibility = () => {
        setIsRatingVisible((prevState) => !prevState); 
    };
   
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
        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }

        try {
            navigate('/reports', { state: { ticket } });
        } catch (error) {
            console.error("Error navigating to reports:", error);
        }
      };

      const handleGoToBids = async (ticket, navigate) => {
        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }

        const result=ticket;

        try {
            navigate(`/auctions/bids/${result.id}`, { state: { result } });
        } catch (error) {
            console.error("Error navigating to reports:", error);
        }
      };

    const api_key = 'JYLAZZ9VPACY4FFAAYWSEDJDJ'
    
    useEffect(() => {
        if (weatherLocation) {
            const searchWeather = async () => {
                const urlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}?unitGroup=metric&include=days&key=${api_key}&contentType=json`;
            
                try {
                    const resWeather = await fetch(urlWeather);
    
                    if (resWeather.ok) {
                        const searchWeatherData = await resWeather.json();
                        setWeatherData(searchWeatherData);
                    } else {
                        setWeatherData({});
                    }
                } catch (error) {
                    setWeatherData({});
                }
            };
    
            searchWeather();
        }
    }, [weatherLocation]);


    useEffect(() => {
        if (eventType === 'Glazba' && ticket?.artistName) {
            setArtistSearch(ticket.artistName)
        }
    }, [eventType, ticket?.artistName, setArtistSearch]);

    const artistSearchToken = "htgBjiTrQMVOEEhWSSiWXEHDxIYVEDNpibEUWEkY"

    useEffect(() => {
        if (artistSearch) {
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
    
            searchArtistFunc();
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

        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }

        try {
            navigate(`/edit-ticket`, { state: { ticket } });
        } catch (error) {
            console.error("Cannot edit ticket:", error);
        }
    };

    const handleDelete = () => {
        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }

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
            //console.log('Ticket deleted');
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
            //console.log('Ticket status updated');
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
        const userID = localStorage.getItem("userID");
    
        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }
        else if (ticket.owner.id === parseInt(userID)) {
            alert('Nemoguće lajkati vlastiti oglas!');
            return; 
        }
    
        setLikeImage(likeImage === "../images/unlike.png" ? "../images/like.png" : "../images/unlike.png");
    
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
                //console.log('Response:', data);
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
                //console.log('Response:', data);
                navigate(-1);
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);  
            });
        }
    };
    

    const handleHideTicket = () => {

        if (ticket.isExchangeAvailable !== "u prodaji" && ticket.isExchangeAvailable !== "razmjena" && ticket.isExchangeAvailable !== "aukcija") {
            alert('Oglas više nije aktivan!');
            return; 
        }

        const access_token = localStorage.getItem("access_token");

    if (hideImage === "../images/show.png") {
        const userConfirmed = window.confirm("Upozorenje: Jednom sakrivena karta se više neće nikad prikazivati!");
        if (!userConfirmed) {
            return;
        }
        fetch(`${backendUrl}/api/favorites/hide`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ticketId: ticket.id,
                userId: userID,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Hidden successfully") {
                    console.log("Ticket successfully hidden");
                    setHideImage("../images/hidden.png");
                } else {
                    throw new Error(data.message || "Unknown error occurred");
                }
                navigate(-1);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("Došlo je do greške pri sakrivanju karte: " + error.message);
            });
    } else if (hideImage === "../images/hidden.png") {
        fetch(`${backendUrl}/api/favorites/unhide`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ticketId: ticket.id,
                userId: userID,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Unhidden successfully") {
                    console.log("Ticket successfully unhidden");
                    setHideImage("../images/show.png");
                } else {
                    throw new Error(data.message || "Unknown error occurred");
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("Došlo je do greške pri prikazivanju karte: " + error.message);
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
                {error && <div>Greška: {error}</div>}
                {ticket && (
                    <div className="ticket-content">
                        <div className="title">
                            <h2>
                                {ticket.eventName} 
                            </h2>
                           <div className="images">
                           {userID && parseInt(userID) === ticket.owner.id && (
                                <img
                                    className="edit"
                                    src="../images/editIcon.png"
                                    alt="edit"
                                    onClick={() => handleEditTicket(ticket)}
                                />)}
                           {userID && parseInt(userID) !== ticket.owner.id && (<>
                                <img 
                                        className="like" 
                                        src={likeImage} 
                                        alt="like" 
                                        onClick={handleLikeClick}
                                    />
                                 <img
                                    className="hide"
                                    src={hideImage}
                                    alt="hide"
                                    onClick={() => handleHideTicket(ticket)}
                                />
                                </>)}
                            </div>
                        </div>
                        <div className="ticket-info">
                            <br/>
                            <div className="div-p">
                                <div className="e">
                                    <span>Mjesto:</span> <span className="answer">{ticket.location}</span>
                                </div>
                                <div className="e">
                                    <span>Datum:</span> <span className="answer">{ticket.eventDate.split('T')[0]}</span>
                                </div>
                                <div className="e">
                                    <span>Vrsta ulaznice:</span> <span className="answer">{ticket.ticketType !== null ? ticket.ticketType : "-"}</span>
                                </div>
                                <div className="e">
                                    <span>Status:</span> <span className="answer">{ticket.isExchangeAvailable}</span>
                                </div>
                                {ticket.isExchangeAvailable === "prodaja" && (
                                    <div className="e">
                                    <span>Cijena:</span> <span className="answer">{ticket.price} €</span>
                                    </div>
                                )}
                                {ticket.isExchangeAvailable === "aukcija" && (
                                    <div className="e">
                                    <span>Početna cijena:</span> <span className="answer">{ticket.startPrice} €</span>
                                    </div>
                                )}
                                <div className="e">
                                    <span>Vrsta događaja:</span> <span className="answer">{ticket.eventTypeId.nazVrDog}</span>
                                </div>
                                <div className="e">
                                    <span>Broj sjedala:</span> <span className="answer">{ticket.seatNumber !== null ? ticket.seatNumber : "-"}</span>
                                </div>
                                <div className="e">
                                    <span>Izbrisana:</span> <span className="answer">{ticket.obrisanoTime !== null ? ticket.obrisanoTime : "-"}</span>
                                </div>
                                {ticket.isExchangeAvailable === "razmjena" && (
                                    <div className="e">
                                    <span>Željena ulaznica:</span> <span className="answer">{ticket.wantedEventName}</span>
                                    </div>
                                )}
                                 {ticket.isExchangeAvailable === "razmjena" && (
                                    <div className="e">
                                    <span>Željeno mjesto:</span> <span className="answer">{ticket.wantedLocation}</span>
                                    </div>
                                )}
                                 {ticket.isExchangeAvailable === "razmjena" && (
                                    <div className="e">
                                    <span>Željeni datum:</span> <span className="answer">{ticket.wantedDate.split('T')[0]}</span>
                                    </div>
                                )}
                                 {ticket.isExchangeAvailable === "razmjena" && (
                                    <div className="e">
                                    <span>Željeni broj sjedala:</span> <span className="answer">{ticket.wantedSeatNumber !== null ? ticket.seatNumber : "-"}</span>
                                    </div>
                                )}
                                <div className="e">
                                    <span>Vrijeme:</span>
                                    <span className="answer">
                                    {weatherData?.days
                                        ? getDaysDifference(ticket.eventDate) >= 0 && getDaysDifference(ticket.eventDate) < 15
                                        ? weatherData?.days?.[Math.ceil(getDaysDifference(ticket.eventDate))]?.conditions || "-"
                                        : "-"
                                        : "-"}
                                    </span>
                                </div>
                                <div className="e">
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
                                        <span>Artist:</span> <span id="artistName">{ticket?.artistName ?? '-'}</span>
                                    </div>
                                    <div className="e">
                                        <span>Artist info:</span> <span id="artistProfile">{artistData.profile ? artistData.profile : "-"}</span>
                                    </div>
                                    </>
                                )}
                            </div>
                            <br/>
                            <p className="ticket-posted-by">Objavio: {ticket.owner.imeKor} {ticket.owner.prezimeKor}</p>
                            {ticket.isExchangeAvailable === "prodano" && ticket.owner.id !== parseInt(userID) && (
                                <div className="email">Email: {ticket.owner.email}</div>
                            )}
                            <StarRate ocjena={ticket.owner.ocjena} />
                            {ticket.owner.id !== parseInt(userID) && ticket.isExchangeAvailable === "prodano" &&  (<button onClick={toggleRatingVisibility} className="toggle-rating-btn">
                                {isRatingVisible ? "Sakrij ocjenjivanje" : "Ocijeni prodavača"}
                            </button>)}
                            {isRatingVisible && ticket.owner.id !== parseInt(userID) && ticket.isExchangeAvailable === "prodano" &&( 
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
                                    <button onClick={handleRating}>Pošalji ocjenu</button>
                                </div>
                            )}
                            <div className="button-container">
                                {canDelete && ticket.isExchangeAvailable !== "aukcija" && (
                                    <button onClick={handleDelete} className="delete-button">
                                        Obriši kartu
                                    </button>
                                )}
                                {canBringBack && <button onClick={handleBack} className="delete-button">Vrati</button>}
                                {userID && ticket.owner.id !== parseInt(localStorage.getItem("userID")) && (
                                    <button className="btn-buy" onClick={() => handleReportClick(ticket, navigate)}>
                                        Prijavi korisnika
                                </button>
                                )}
                                {userID && ticket.owner.id === parseInt(localStorage.getItem("userID")) && ticket.isExchangeAvailable === "aukcija" && (
                                    <button className="btn-goto" onClick={() => handleGoToBids(ticket, navigate)}>
                                        Idi u ponude
                                    </button>
                                )}
                                {userID && ticket.owner.id !== parseInt(localStorage.getItem("userID")) && ticket.isExchangeAvailable === "aukcija" && (
                                    <button className="btn-goto" onClick={() => handleGoToBids(ticket, navigate)}>
                                        Idi u aukciju
                                    </button>
                                )}
                                {userID && ticket.owner.id !== parseInt(localStorage.getItem("userID")) && ticket.isExchangeAvailable === "u prodaji" && (
                                    <button className="btn-buyTicket" onClick={() => handleBuyClick(ticket)}>
                                        Kupi
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default TicketDetails;
