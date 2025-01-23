import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../style/Shop.css';

const Shop = () => {
    const [isUser, setIsUser] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    let access_token = localStorage.getItem("access_token");

    useEffect(() => {
            const checkIsUser = async () => {
                try {
                    const response = await fetch(`${backendUrl}/api/users/isUser`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });
                    const data = await response.json();
                    setIsUser(data);
                } catch (error) {
                    console.error('Error checking user role:', error);
                    setIsUser(false);
                }
            };
    
            checkIsUser();
        }, [access_token, backendUrl]);
    
    if (isUser === false) {
        return <div>Izbačeni ste sa stranice!</div>;
    }
    
    if (isUser === null) {
        return <div>Učitavam...</div>;
    }

    return (
        <div className="shop-container">
            <h1>Dobrodošli u dućan!</h1>
            <p className="shop-description">Odaberite opciju koja vam najbolje odgovara</p>
            <nav>
                <ul className="shop-menu">
                    <li>
                        <Link to="/buy" className="shop-link">Kupnja</Link>
                    </li>
                    <li>
                        <Link to="/auctions" className="shop-link">Aukcija</Link>
                    </li>
                    <li>
                        <Link to="/exchange" className="shop-link">Razmjena</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Shop;
