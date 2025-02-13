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

export default AddDataPage;
ubuntu@ip-172-31-42-91:~/Mon_projet_aws/frontend/src/components$ cat SearchPage.js
import React, { useState } from "react";
import axios from "axios";
import "./SearchPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";  

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("⚠️ Veuillez entrer un mot-clé avant de rechercher.");
      setResults(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔎 Requête envoyée à : ${API_URL}/search?query=${query}`);
      const response = await axios.get(`${API_URL}/search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error("❌ Erreur :", err);
      setError("❌ Erreur de connexion. Vérifiez l'API.");
    }

    setLoading(false);
  };

  return (
    <div className="search-container">
      <h2>🔎 Recherche</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
      <button onClick={handleSearch}>Rechercher</button>
      {loading && <p>⏳ Recherche en cours...</p>}
      {error && <p className="error">{error}</p>}
      {results && (
        <ul>
          {Object.entries(results).map(([category, items]) => (
            <li key={category}>
              <h3>{category.toUpperCase()} :</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>{item.name || item.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
