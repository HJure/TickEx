import '../style/Sidebar.css';
import '../style/profile.css';
import { Link } from "react-router-dom";

function Sidebar({ setActiveTab }) {
    return (
        <div className="categories">
            <button onClick={() => setActiveTab('profile')}>PROFIL<img src="../images/account.png" alt='profile'/></button>
            <button onClick={() => setActiveTab('myOffers')}>MOJE PONUDE<img src="../images/sale.png" alt='sale'/></button>
            <button onClick={() => setActiveTab('purchased')}>KUPLJENO<img src="../images/trolley.png" alt='trolley'/></button>
            <button onClick={() => setActiveTab('sold')}>PRODANO<img src="../images/trolley.png" alt='trolley'/></button>
            <button onClick={() => setActiveTab('rate')}>OCIJENI<img src="../images/trolley.png" alt='trolley'/></button>
            <button onClick={() => setActiveTab('deleted')}>SMEĆE<img src="../images/delete.png" alt='deleted'/></button>
            <button onClick={() => setActiveTab('expired')}>ISTEKLO<img src="../images/expired.png" alt='expired'/></button>
            <button onClick={() => setActiveTab('liked')}>SVIĐA MI SE<img src="../images/like.png" alt='like'/></button>
            <button onClick={() => setActiveTab('exchangeChains')}>LANCI RAZMJENE<img src="../images/chain.png" alt='chain'/></button>
            <Link to="/create" className="newBlog">Dodaj novu ulaznicu</Link>
        </div>
    );
}

export default Sidebar;
