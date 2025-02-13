const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS : Autorise toutes les origines (à sécuriser en production)
app.use(cors({ origin: "*" }));

// ✅ Connexion à PostgreSQL avec gestion des erreurs
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => {
    console.log("✅ Connexion à PostgreSQL réussie !");
    console.log(`🗄️  Base de données : ${process.env.DB_NAME}`);
    console.log(`📡 Hôte : ${process.env.DB_HOST}`);
  })
  .catch(err => {
    console.error("❌ Erreur de connexion à PostgreSQL :", err.message);
    process.exit(1);
  });

// 🔹 Mapping des tables et colonnes
const categoryColumns = {
  jeux: "name",
  car: "brand",
  technologie: "name",
  sante: "name",
  musique: "title",
  mode: "brand",
  actualite: "title",
  livres: "title",
  films: "title",
  art: "title",
};

// ✅ Route pour vérifier si l'API fonctionne
app.get("/", (req, res) => {
  res.send("🚀 API en ligne et fonctionnelle !");
});

// ✅ Route pour voir toutes les données d'une catégorie
app.get("/debug/:category", async (req, res) => {
  const { category } = req.params;
  if (!categoryColumns[category]) {
    return res.status(400).json({ error: "Catégorie invalide" });
  }

  try {
    console.log(`🔍 Requête: SELECT * FROM ${category}`);
    const result = await pool.query(`SELECT * FROM ${category}`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Erreur :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

// ✅ Route de recherche globale
app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Le champ 'query' est requis" });
  }

  try {
    let results = {};
    for (const [category, column] of Object.entries(categoryColumns)) {
      const queryResult = await pool.query(
        `SELECT '${category}' AS category, * FROM ${category} WHERE ${column} ILIKE $1`,
        [`%${query}%`]
      );
      if (queryResult.rows.length > 0) results[category] = queryResult.rows;
    }
    res.json(Object.keys(results).length === 0 ? { message: "Aucun résultat trouvé." } : results);
  } catch (err) {
    console.error("❌ Erreur :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

// ✅ Route pour ajouter des données
app.post("/add/:category", async (req, res) => {
  const { category } = req.params;
  const data = req.body;

  if (!categoryColumns[category]) {
    return res.status(400).json({ error: "Catégorie invalide" });
  }

  try {
    console.log(`🔄 Requête POST reçue pour ajouter dans '${category}' :`, data);

    const queryMap = {
      jeux: ["INSERT INTO jeux (name, description, release_date) VALUES ($1, $2, $3) RETURNING *", ["name", "description", "release_date"]],
      car: ["INSERT INTO car (brand, model, year) VALUES ($1, $2, $3) RETURNING *", ["brand", "model", "year"]],
      technologie: ["INSERT INTO technologie (name, manufacturer, release_year) VALUES ($1, $2, $3) RETURNING *", ["name", "manufacturer", "release_year"]],
      sante: ["INSERT INTO sante (name, category, description) VALUES ($1, $2, $3) RETURNING *", ["name", "category", "description"]],
      musique: ["INSERT INTO musique (title, artist, release_year) VALUES ($1, $2, $3) RETURNING *", ["title", "artist", "release_year"]],
      mode: ["INSERT INTO mode (brand, type, season) VALUES ($1, $2, $3) RETURNING *", ["brand", "type", "season"]],
      actualite: ["INSERT INTO actualite (title, date, source, description) VALUES ($1, $2, $3, $4) RETURNING *", ["title", "date", "source", "description"]],
      livres: ["INSERT INTO livres (title, author, publication_year, genre) VALUES ($1, $2, $3, $4) RETURNING *", ["title", "author", "publication_year", "genre"]],
      films: ["INSERT INTO films (title, director, release_year, genre) VALUES ($1, $2, $3, $4) RETURNING *", ["title", "director", "release_year", "genre"]],
      art: ["INSERT INTO art (title, artist, year, description) VALUES ($1, $2, $3, $4) RETURNING *", ["title", "artist", "year", "description"]],
    };

    const [query, fields] = queryMap[category];
    const values = fields.map(field => data[field]);

    if (values.includes(undefined)) {
      return res.status(400).json({ error: `Tous les champs suivants sont requis : ${fields.join(", ")}` });
    }

    const result = await pool.query(query, values);
    res.json({ message: "✅ Donnée ajoutée avec succès", data: result.rows[0] });
  } catch (err) {
    console.error("❌ Erreur lors de l'insertion :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

// ✅ Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur http://0.0.0.0:${port}`);
});
