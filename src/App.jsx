import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Header,
  AllArticles,
  SingleArticle,
  AllUsers,
  ArticlesByCategory,
  PathNotFound,
  Footer,
} from "./components";

function App() {
  return (
    <div className="msmi-news-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route
          path="/articles/topic/:category"
          element={<ArticlesByCategory />}
        />
        <Route path="/users" element={<AllUsers />} />
        <Route path="*" element={<PathNotFound />} />
      </Routes>
      <div className="bottom"></div>
    </div>
  );
}

export default App;
