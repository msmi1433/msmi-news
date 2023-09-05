import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Header, AllArticles, SingleArticle } from "./components";

function App() {
  return (
    <div className="msmi-news-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
