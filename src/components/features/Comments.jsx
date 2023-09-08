import React, { useState, useEffect, useContext } from "react";
import {
  getArticleComments,
  optRenderComment,
  postComment,
  getTimeSince,
  deleteComment,
  optRenderCommentDelete,
  updateCommentVotes,
  optRenderCommentVotes,
} from "../apiCalls";
import { UserContext } from "../";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);

  const handleUpvote = (commentId) => {
    updateCommentVotes(commentId, 1).catch((err) => {
      alert(
        "Sorry, your comment vote could not be posted. Please refresh the page and try again"
      );
    });
    optRenderCommentVotes(commentId, 1, comments, setComments);
  };

  const handleDownvote = (commentId) => {
    updateCommentVotes(commentId, -1).catch((err) => {
      alert(
        "Sorry, your comment vote could not be posted. Please refresh the page and try again"
      );
    });
    optRenderCommentVotes(commentId, -1, comments, setComments);
  };

  const handleCommentDelete = (commentId, currComments, setComments) => {
    deleteComment(commentId).catch((err) =>
      alert(
        "Sorry, your comment could not be deleted. Please refresh the page and try again"
      )
    );
    optRenderCommentDelete(currComments, commentId, setComments);
  };

  useEffect(() => {
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
  }, []);

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
            maxLength={"500"}
            required
          ></textarea>
          <div className="post-comment-flex">
            <button
              type="submit"
              className="post-comment-button"
              onClick={(e) => {
                e.preventDefault();
                if (newComment !== "") {
                  postComment(articleId, user.username, newComment)
                    .then(() => {
                      return getArticleComments(articleId);
                    })
                    .then((updatedComments) => {
                      setComments(updatedComments);
                    })
                    .catch((err) => {
                      alert(
                        "Sorry - your comment could not be posted at this time; please try again later."
                      );
                    });
                  optRenderComment(
                    comments,
                    newComment,
                    user.username,
                    setComments
                  );
                } else {
                  alert("Comments cannot be blank");
                }
                setNewComment("");
              }}
            >
              Post comment
            </button>
          </div>
        </form>
      </section>
      <section className="list-comments">
        <ol className="comments-ol">
          {comments.map((comment) => {
            const isOwnComment =
              comment.author === user.username ? true : false;
            return (
              <li key={comment.comment_id} className="comment-card">
                <h4 className="commenter-name">@{comment.author}</h4>
                <p className="comment-posted">
                  <span className="date-color">
                    {getTimeSince(comment.created_at)}
                  </span>
                </p>
                <p className="comment-body">{comment.body}</p>
                <p className="comment-votes">
                  <span className="bold">{comment.votes}</span> votes
                </p>
                <div className="comment-button-flex">
                  <div className="comment-vote-buttons">
                    <button
                      onClick={() => {
                        handleUpvote(comment.comment_id);
                      }}
                      className="comment-upvote"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => {
                        handleDownvote(comment.comment_id);
                      }}
                      className="comment-downvote"
                    >
                      👎
                    </button>
                  </div>
                  <div className="comment-delete-button">
                    {isOwnComment ? (
                      <button
                        className="comment-delete"
                        onClick={() => {
                          handleCommentDelete(
                            comment.comment_id,
                            comments,
                            setComments
                          );
                        }}
                      >
                        Delete comment
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </section>
  );
};

export default Comments;
