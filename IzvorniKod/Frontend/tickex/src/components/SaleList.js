import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SaleList = ({ sales, title }) => {
    const [tickets, setTickets] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/tickets`);
                if (!response.ok) throw new Error('Error fetching tickets');
                const ticketsData = await response.json();
                setTickets(ticketsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTickets();
    }, [backendUrl]);

    const getSaleWithTicket = (sale) => {
        const ticket = tickets.find(ticket => ticket.id === sale.id);
        return ticket ? { ...sale, ticket } : null;
    };

    return (  
        <div className="ticket-list">
            <h2>{title}</h2>
            <div className="tickets">
                {sales.map((sale) => {
                    const saleWithTicket = getSaleWithTicket(sale);
                    if (saleWithTicket) {
                        return (
                            <div className="ticket-preview" key={sale.id}>   
                                <Link to={`/sales/${sale.id}`}>
                                    <h2>{saleWithTicket.ticket.eventName}</h2>
                                </Link>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default SaleList;
