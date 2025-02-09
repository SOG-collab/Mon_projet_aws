-- Table pour les jeux vidéo
CREATE TABLE IF NOT EXISTS jeux (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  release_date DATE
);

-- Table pour les voitures
CREATE TABLE IF NOT EXISTS car (
  id SERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT
);

-- Table pour la technologie
CREATE TABLE IF NOT EXISTS technologie (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  manufacturer TEXT,
  release_year INT
);

-- Table pour la santé
CREATE TABLE IF NOT EXISTS sante (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT
);

-- Table pour la musique
CREATE TABLE IF NOT EXISTS musique (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT,
  release_year INT
);

-- Table pour la mode
CREATE TABLE IF NOT EXISTS mode (
  id SERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  type TEXT,
  season TEXT
);

-- Table pour les actualités
CREATE TABLE IF NOT EXISTS actualite (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE,
  source TEXT,
  description TEXT
);

-- Table pour les livres
CREATE TABLE IF NOT EXISTS livres (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  publication_year INT,
  genre TEXT
);

-- Table pour les films
CREATE TABLE IF NOT EXISTS films (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  release_year INT,
  genre TEXT
);

-- Table pour l'art
CREATE TABLE IF NOT EXISTS art (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT,
  year INT,
  description TEXT
);
