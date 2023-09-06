import React, { useState, useEffect, useContext } from "react";
import {
  getArticleComments,
  optRenderComment,
  postComment,
  getTimeSince,
} from "../apiCalls";
import { UserContext } from "../";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);

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
        alert(
          "Sorry - your comment could not be posted at this time; please try again later."
        );
      });
  });

  if (isLoading) return <p className="loading-message">Comments loading...</p>;
  if (isError)
    return (
      <p className="error-message">Something went wrong - please try again</p>
    );

  return (
    <section className="comments container">
      <section className="post-comment">
        <form className="comment-form">
          <textarea
            value={newComment}
            placeholder="Add a comment..."
            type="text"
            className="comment-input"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button
            type="submit"
            className="comment-button"
            onClick={(e) => {
              e.preventDefault();
              postComment(articleId, user.username, newComment);
              optRenderComment(
                comments,
                newComment,
                user.username,
                setComments
              );
              setNewComment("");
            }}
          >
            Post comment
          </button>
        </form>
      </section>
      <section className="list-comments">
        <ol className="comments-ol">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment-card">
                <h4 className="commenter-name">@{comment.author}</h4>
                <p className="comment-posted">
                  {getTimeSince(comment.created_at)}
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
    </section>
  );
};

export default Comments;
