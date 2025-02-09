import React, { useState } from "react";
import axios from "axios";
import "./AddDataPage.css";  // ✅ Ajout de l'import CSS

const AddDataPage = () => {
  const [category, setCategory] = useState("jeux");
  const [data, setData] = useState({ name: "", description: "", release_date: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/add/${category}`, data);
      setMessage("Donnée ajoutée avec succès !");
      console.log(response.data);
    } catch (error) {
      setMessage("Erreur lors de l'ajout !");
      console.error("Erreur d'ajout :", error);
    }
  };

  return (
    <div className="add-data-container">
      <h2 className="add-data-title">Ajouter une donnée</h2>
      <form onSubmit={handleSubmit} className="add-data-form">
        <select onChange={(e) => setCategory(e.target.value)} className="add-data-select">
          <option value="jeux">Jeux</option>
          <option value="car">Voiture</option>
          <option value="technologie">Technologie</option>
          <option value="sante">Santé</option>
        </select>
        <input type="text" name="name" placeholder="Nom" onChange={handleChange} className="add-data-input" />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} className="add-data-input" />
        <input type="date" name="release_date" onChange={handleChange} className="add-data-input" />
        <button type="submit" className="add-data-button">Ajouter</button>
      </form>
      <p className="add-data-message">{message}</p>
    </div>
  );
};

export default AddDataPage;
