import React, { useState } from "react";
import axios from "axios";
import "./AddDataPage.css";  // ✅ Style CSS

const API_URL = process.env.REACT_APP_API_URL || "http://51.44.7.116:5000";  // Remplace localhost par ton IP publique

const AddDataPage = () => {
  const [category, setCategory] = useState("jeux");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  // Définition dynamique des champs selon la catégorie
  const categoryFields = {
    jeux: ["name", "description", "release_date"],
    car: ["brand", "model", "year"],
    technologie: ["name", "manufacturer", "release_year"],
    sante: ["name", "category", "description"],
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");  // Réinitialisation du message

    try {
      console.log(`🔄 Envoi des données à : ${API_URL}/add/${category}`);
      const response = await axios.post(`${API_URL}/add/${category}`, data);
      setMessage("✅ Donnée ajoutée avec succès !");
      console.log(response.data);
      setData({}); // Réinitialiser les champs après succès
    } catch (error) {
      if (error.response) {
        setMessage(`❌ Erreur: ${error.response.data.error || "Échec de l'ajout"}`);
      } else {
        setMessage("❌ Impossible de contacter le serveur !");
      }
      console.error("❌ Erreur d'ajout :", error);
    }
  };

  return (
    <div className="add-data-container">
      <h2 className="add-data-title">➕ Ajouter une donnée</h2>
      <form onSubmit={handleSubmit} className="add-data-form">
        <select onChange={(e) => { setCategory(e.target.value); setData({}); }} className="add-data-select">
          {Object.keys(categoryFields).map((cat) => (
            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>
        {categoryFields[category]?.map((field) => (
          <input key={field} type="text" name={field} placeholder={field} onChange={handleChange} className="add-data-input" />
        ))}
        <button type="submit" className="add-data-button">Ajouter</button>
      </form>
      <p className="add-data-message">{message}</p>
    </div>
  );
};
