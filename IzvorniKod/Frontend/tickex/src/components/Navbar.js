import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function Navbar({ profile, setProfile }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token")); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleAboutClick = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }
        setTimeout(() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const logOut = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userID");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_first_name");
        localStorage.removeItem("user_last_name");
        localStorage.removeItem("user_registration_date");
        localStorage.removeItem("user_status");
        localStorage.removeItem("user_rating");

        setProfile(null);
        setAccessToken(null);

        if (location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    }, [location, navigate, setProfile]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setAccessToken(token); 
    }, [location]);

    return (
        <div className="navigation">
            <Link to="/" className="logo">
                <img src="../images/logo.png" alt="logo" />
            </Link>
            <nav className="navigation-menu">
                <ul>
                    {accessToken && <li className="nav-link nav-link-line"><Link className="link" to="/profile">Profil</Link></li>}
                    {!accessToken && <li className="nav-link nav-link-line"><Link className="link" to="/signup">Prijavi se</Link></li>}
                    {accessToken && <li className="nav-link nav-link-line"><Link className="link" to="/shop">Započni</Link></li>}
                    {accessToken && <li className="nav-link nav-link-line"><button className="link" onClick={logOut} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>ODJAVI SE</button></li>}
                    <li className="nav-link nav-link-line"><button className="link" onClick={handleAboutClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>O NAMA</button></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
