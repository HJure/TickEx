import '../style/profile.css';
import { Link } from "react-router-dom";

const TicketList = ({ tickets, title }) => {
    return (  
        <div className="ticket-list">
            <div className="tickets">
                {tickets.map((ticket) => (
                    <div className="ticket-preview" key={ticket.id}>   
                        <Link to={ `/tickets/${ticket.id}` }>
                            <div className='eventType'>
                                <h1>
                                    { 
                                        (ticket.buyer && ticket.buyer.id === parseInt(localStorage.getItem("userID"))) || 
                                        (ticket.winner && ticket.winner.id === parseInt(localStorage.getItem("userID")))
                                            ? "kupljeno"
                                            : ticket.isExchangeAvailable 
                                    }
                                </h1>
                            </div>
                            <div className='eventInfo'>
                                <h2>{ ticket.eventName }</h2>
                                {ticket.endPrice && <h3>Konačna cijena: {ticket.endPrice}</h3>}
                                <h3>{ticket.eventDate}</h3>
                                <h3>{ticket.location}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketList;
