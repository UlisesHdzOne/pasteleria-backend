import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="navbar__top">
        <button className="navbar__toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <nav className={`navbar__container ${open ? "is-open" : ""}`}>
        <Link className="navbar__link" to="/">
          Vehículos
        </Link>
        <Link className="navbar__link" to="/driven-list">
          Driven List
        </Link>
        <Link className="navbar__link" to="/course">
          Course List
        </Link>
        <Link className="navbar__link" to="/driven-course">
          Driven-Cursos
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
