import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Recherche</h2>
      <input
        type="text"
        placeholder="Entrez un mot-clé..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
        Rechercher
      </button>

      {loading && <p>🔎 Recherche en cours...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Résultats :</h3>
          {Object.entries(results).map(([category, items]) => (
            <div key={category} style={{ marginBottom: "20px" }}>
              <h4 style={{ textTransform: "capitalize" }}>{category} :</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
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
