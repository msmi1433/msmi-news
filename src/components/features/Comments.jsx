import React, { useState, useEffect } from "react";
import { getArticleComments } from "../apiCalls";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useState(() => {
    setIsLoading(true);
    getArticleComments(articleId)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  });

  if (isLoading) return <p className="loading-message">Comments loading...</p>;
  if (isError)
    return (
      <p className="error-message">Something went wrong - please try again</p>
    );

  return (
    <section className="comments container">
      <ol className="comments-ol">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-card">
              <h4 className="commenter-name">@{comment.author}</h4>
              <p className="comment-posted">
                {new Date(comment.created_at).toLocaleDateString({
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-votes">Votes: {comment.votes}</p>
              <button className="comment-upvote">👍</button>
              <button className="comment-downvote">👎</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Comments;
