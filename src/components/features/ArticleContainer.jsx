import React, { useEffect, useState } from "react";
import { getArticles } from "../apiCalls";
import { Link } from "react-router-dom";

const ArticleContainer = ({ pageNumber, category, setErrStatus }) => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("DESC");
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, pageNumber, category, orderBy)
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrStatus(err.response.data.msg);
        setIsError(true);
        setIsLoading(false);
      });
  }, [pageNumber, category, sortBy, orderBy]);

  if (isLoading) return <h3 className="loading-message">Loading...</h3>;
  if (isError)
    return (
      <h3 className="error-message">Something went wrong - please try again</h3>
    );

  return (
    <section className="article-container">
      {pathname !== "/" ? (
        <>
          <select
            defaultValue={sortBy}
            className="sort-by selector"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="created_at">Date published</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
          <select
            defaultValue={orderBy}
            className="order-by selector"
            onChange={(e) => {
              setOrderBy(e.target.value);
            }}
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </>
      ) : null}
      <ol className="articles-ol">
        {articleList.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={`article-link-${article.article_id}`}
            >
              <li className="article-card" key={article.article_id}>
                <img
                  src={article.article_img_url}
                  alt={`${article.title} image`}
                  className="article-img"
                />
                <h3 className="article-title">{article.title}</h3>
                <p className="article-topic">{article.topic}</p>
              </li>
            </Link>
          );
        })}
      </ol>
    </section>
  );
};

export default ArticleContainer;
