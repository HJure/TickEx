import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Shop.css'; // Učitajte stilove

const Shop = () => {
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
                        <Link to="/auction" className="shop-link">Aukcija</Link>
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
