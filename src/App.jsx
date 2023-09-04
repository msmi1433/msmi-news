import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Header } from "./components";

function App() {
  return (
    <div className="msmi-news-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
