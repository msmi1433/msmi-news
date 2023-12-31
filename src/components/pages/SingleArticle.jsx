import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  getArticleAuthor,
  getSingleArticle,
  optRenderArticleVotes,
  updateArticleVotes,
} from "../apiCalls";
import { Link } from "react-router-dom";
import { Comments, UserContext, RelatedArticles } from "../";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});

  const handleArticleUpvote = () => {
    updateArticleVotes(article_id, 1).catch((err) => {
      alert("Sorry, your vote could not be logged. Please try again later");
    });
    optRenderArticleVotes(article, setArticle, 1);
  };

  const handleArticleDownvote = () => {
    updateArticleVotes(article_id, -1).catch((err) => {
      alert("Sorry, your vote could not be logged. Please try again later");
    });
    optRenderArticleVotes(article, setArticle, -1);
  };

  useEffect(() => {
    setIsLoading(true);
    getSingleArticle(article_id)
      .then((returnedArticle) => {
        setArticle(returnedArticle);
        return returnedArticle;
      })
      .then((returnedArticle) => {
        return getArticleAuthor(returnedArticle.author);
      })
      .then((author) => {
        setAuthor(author);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading)
    return <h3 className="loading-message container">Loading...</h3>;
  if (isError) {
    return (
      <section className="article error">
        <h3 className="error-message">404 - This article does not exist</h3>
        <Link to={"/articles"}>Go to all articles</Link>
      </section>
    );
  }

  return (
    <section className="single-article container">
      <div className="single-article head">
        <div className="single-article title">
          <h1 className="single-article h1">{article.title}</h1>
          <p className="single-article topic">{article.topic}</p>
        </div>
        <div className="article-and-image">
          <img
            src={article.article_img_url}
            alt={`${article.title} image`}
            className="single-article image"
          />
          <div className="single-article body">
            <p>{article.body}</p>
          </div>
        </div>
        <div className="single-article info-box">
          <div className="article-data">
            <p className="single-article author">
              Written by <span className="bold">{author.name}</span>
            </p>
            <p className="single-article date">
              <span className="bold">
                {new Date(article.created_at).toLocaleDateString({
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="single-article votes">
              <span className="bold">{article.votes}</span> Votes
            </p>
            <div className="article-votes button">
              <button
                className="upvote-button"
                onClick={(e) => {
                  e.currentTarget.disabled = true;
                  handleArticleUpvote();
                }}
              >
                Upvote 👍
              </button>
              <button
                className="downvote-button"
                onClick={(e) => {
                  e.currentTarget.disabled = true;
                  handleArticleDownvote();
                }}
              >
                Downvote 👎
              </button>
            </div>
          </div>
          <div className="related-articles">
            <RelatedArticles topic={article.topic} id={article.article_id} />
          </div>
        </div>
      </div>

      <h2 className="comments-h2">Comments</h2>
      <Comments articleId={article_id} />
    </section>
  );
};

export default SingleArticle;
