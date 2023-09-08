import React, { useEffect, useState } from "react";
import { getArticles, getTimeSince } from "../apiCalls";
import { Link } from "react-router-dom";

const ArticleContainer = ({ pageNumber, categoryState, setErrStatus }) => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("DESC");
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, pageNumber, categoryState, orderBy)
      .then((articles) => {
        if (pathname === "/") {
          articles.pop();
        }
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrStatus(err.response.data.msg);
        setIsError(true);
        setIsLoading(false);
      });
  }, [pageNumber, categoryState, sortBy, orderBy]);

  if (isLoading) return <h3 className="loading-message">Loading...</h3>;
  if (isError)
    return (
      <h3 className="error-message">Something went wrong - please try again</h3>
    );

  return (
    <section className="article-container">
      {pathname !== "/" ? (
        <div className="sort-order-container">
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
        </div>
      ) : null}
      <ol className="articles-ol">
        {articleList.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={`article-link-${article.article_id}`}
              className="article-card-link"
            >
              <li className="article-card" key={article.article_id}>
                <img
                  src={article.article_img_url}
                  alt={`${article.title} image`}
                  className="article-img"
                />
                <div className="article-card-header">
                  <p className="article-created-at">
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                  <p>&nbsp;|&nbsp;</p>
                  <p className="article-topic">{article.topic}</p>
                </div>
                <h3 className="article-title">{article.title}</h3>
              </li>
            </Link>
          );
        })}
      </ol>
    </section>
  );
};

export default ArticleContainer;
