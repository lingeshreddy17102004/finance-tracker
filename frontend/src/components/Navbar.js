import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <h2>💰 Personal Finance Manager</h2>

            <button onClick={logout}>

                Logout

            </button>

        </nav>

    );

}

export default Navbar;