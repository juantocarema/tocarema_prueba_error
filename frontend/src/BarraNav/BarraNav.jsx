import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BarraNav.css';

export default function BarraNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="barra-navbar navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          🌐 Ecosystem
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navMenu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/" onClick={closeMenu}>Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/responsables" onClick={closeMenu}>Responsables</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/proveedores" onClick={closeMenu}>Proveedores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/personas" onClick={closeMenu}>Personas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/estadosolicitud" onClick={closeMenu}>Estados Solicitud</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/estadoequipo" onClick={closeMenu}>Estados Equipo</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
