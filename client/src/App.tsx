import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import { Add } from "./pages/Add";
import { Books } from "./pages/Books";
import { Update } from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
