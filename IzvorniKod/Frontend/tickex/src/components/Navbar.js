import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
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

    return (
        <>
          <div className="navigation">
            <Link to="/" className="logo">
                <img src="./images/logo.png" alt="logo" />
            </Link>
            <nav className="navigation-menu">
                <ul>
                    <li className="nav-link nav-link-line" ><Link className="link" to="/profile">Profil</Link></li>
                    <li className="nav-link nav-link-line" ><Link className="link" to="/signup">Prijavi se</Link></li>
                    <li className="nav-link nav-link-line">
                        <button className="abtbutton" onClick={handleAboutClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                            O nama
                        </button>
                    </li>
                </ul>
            </nav>
          </div>
        </>
    );
}

export default Navbar;
