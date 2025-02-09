import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Vérifie bien que ce fichier existe

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">🌍 Mon Projet</h1>
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/search">Rechercher</Link></li>
        <li><Link to="/add">Ajouter des données</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
