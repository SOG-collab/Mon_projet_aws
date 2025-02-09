import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import AddDataPage from "./components/AddDataPage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/add" element={<AddDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
