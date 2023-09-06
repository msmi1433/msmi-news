import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  getArticleAuthor,
  getSingleArticle,
  optRenderArticleVotes,
  updateArticleVotes,
} from "../apiCalls";
import { Link } from "react-router-dom";
import { Comments, UserContext } from "../";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const { user, setUser } = useContext(UserContext);

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
  }, []);

  if (isLoading) return <h3 className="loading-message">Loading...</h3>;
  if (isError)
    return (
      <h3 className="error-message">Something went wrong - please try again</h3>
    );

  return (
    <section className="single-article container">
      <div className="single-article head">
        <div className="single-article title">
          <h1 className="single-article h1">{article.title}</h1>
          <p className="single-article topic">{article.topic}</p>
          <img
            src={article.article_img_url}
            alt={`${article.title} image`}
            className="single-article image"
          />
        </div>
        <div className="single-article info-box">
          <Link>
            <p className="single-article author">{author.name}</p>
          </Link>
          <p className="single-article date">
            Published:{" "}
            {new Date(article.created_at).toLocaleDateString({
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="single-article votes">Article votes: {article.votes}</p>
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
      <div className="single-article body">
        <p>{article.body}</p>
      </div>
      <h2 className="comments-h2">Comments</h2>
      <Comments articleId={article_id} />
    </section>
  );
};

export default SingleArticle;
