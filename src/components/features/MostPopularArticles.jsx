import React, { useState, useEffect } from "react";
import { getArticles } from "../apiCalls";

const MostPopularArticles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles("votes")
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="most-popular-articles">
      <ol className="articles-ol">
        {articleList.map((article) => {
          return (
            <li className="article-card" key={article.article_id}>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-topic">{article.topic}</p>
              <p className="article-votes">Votes: {article.votes}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default MostPopularArticles;
