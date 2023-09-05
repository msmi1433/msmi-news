import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Header, AllArticles } from "./components";

function App() {
  return (
    <div className="msmi-news-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
      </Routes>
    </div>
  );
}

export default App;
