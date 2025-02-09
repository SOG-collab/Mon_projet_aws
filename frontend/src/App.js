import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddDataPage from "./components/AddDataPage";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <Router>
      <div>
        <h1>Mon Projet AWS</h1>
        <nav>
          <ul>
            <li><Link to="/">Rechercher</Link></li>
            <li><Link to="/add">Ajouter des données</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/add" element={<AddDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
