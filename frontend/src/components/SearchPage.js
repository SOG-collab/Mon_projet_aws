import React, { useState } from "react";
import axios from "axios";
import "./SearchPage.css";  // ✅ Ajout de l'import CSS

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Veuillez entrer un mot-clé avant de rechercher.");
      setResults(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/search?query=${query}`);
      if (Object.keys(response.data).length === 0) {
        setResults(null);
        setError("Aucun résultat trouvé.");
      } else {
        setResults(response.data);
      }
    } catch (err) {
      setError("Erreur lors de la recherche. Vérifiez votre connexion.");
      setResults(null);
    }

    setLoading(false);
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Recherche</h2>
      <input
        type="text"
        placeholder="Entrez un mot-clé..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Rechercher</button>

      {loading && <p>🔎 Recherche en cours...</p>}
      {error && <p className="search-error">{error}</p>}

      {results && (
        <div className="search-results">
          <h3>Résultats :</h3>
          {Object.entries(results).map(([category, items]) => (
            <div key={category}>
              <h4 className="search-category">{category} :</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="search-item">
                    <strong>{item.name || item.title}</strong>
                    {item.description && <p>{item.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
