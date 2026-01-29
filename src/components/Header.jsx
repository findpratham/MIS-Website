import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/Logo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false); // shrink
  const [isLight, setIsLight] = useState(true); // on hero: white text
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const goHome = () => {
    navigate("/home");
    closeMenu();
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const past = y > 450;

      setScrolled(past);
      setIsLight(!past);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header-container ${scrolled ? "scrolled" : ""} ${
        isLight ? "header-light" : "header-dark"
      }`}
    >
      <div
        className="logo"
        role="button"
        tabIndex={0}
        onClick={goHome}
        onKeyDown={(e) => e.key === "Enter" && goHome()}
      >
        <img src={logo} alt="MIS" className="tablogo-img" />
      </div>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="bar top"></span>
        <span className="bar middle"></span>
        <span className="bar bottom"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/home" end onClick={closeMenu}>
              Home
            </NavLink>
          </li>

          {/* SOLUTIONS (dropdown) */}
          <li className="nav-item">
            <NavLink to="/solutions" onClick={closeMenu}>
              Solutions
            </NavLink>

            <ul className="dropdown">
              <li>
                <NavLink to="/solutions/residential" onClick={closeMenu}>
                  Residential Rooftop Solar Solutions
                </NavLink>
              </li>
              <li>
                <NavLink to="/solutions/commercial" onClick={closeMenu}>
                  Commercial Rooftop Solar Solutions
                </NavLink>
              </li>
              <li>
                <NavLink to="/solutions/futuristic" onClick={closeMenu}>
                  Futuristic Solar Solutions
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/partnerships" onClick={closeMenu}>
              Partnerships
            </NavLink>
          </li>

          <li>
            <NavLink to="/career" onClick={closeMenu}>
              Career
            </NavLink>
          </li>

          <li>
            <NavLink to="/blog" onClick={closeMenu}>
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact Us
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/solar-calculator">Solar Calculator</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
