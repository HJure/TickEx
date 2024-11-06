import { Link } from "react-router-dom";

const TicketList = ({ tickets, title }) => {

    return (  
        <div className="ticket-list">
            <h2>{ title }</h2>
            <div className="tickets">
                {tickets.map((ticket) => (
                    <div className="ticket-preview" key={ticket.id}>   
                        <Link to={ `/tickets/${ticket.id}` }>
                            <h2>{ ticket.eventName }</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default TicketList;