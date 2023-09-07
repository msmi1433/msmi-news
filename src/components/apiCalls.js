import axios from "axios";
import moment from "moment";

const newsApi = axios.create({
  baseURL: "https://msmi-news.onrender.com/api",
});

export const getArticles = (
  sortBy = undefined,
  page = undefined,
  category = undefined
) => {
  return newsApi
    .get("/articles", {
      params: {
        topic: category,
        sort_by: sortBy,
        page: page,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getSingleArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data }) => {
    return data.article;
  });
};

export const getArticleAuthor = (author) => {
  return newsApi.get(`/users/${author}`).then(({ data }) => {
    return data.user;
  });
};

export const getNumOfPages = (category = undefined) => {
  return newsApi
    .get("/articles", { params: { topic: category, limit: 1000 } })
    .then(({ data }) => {
      return Math.ceil(data.articles.length / 10);
    });
};

export const getArticleComments = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const updateArticleVotes = (articleId, vote) => {
  return newsApi.patch(`/articles/${articleId}`, { inc_votes: vote });
};

export const optRenderArticleVotes = (article, setArticle, votes) => {
  article.votes += votes;
  setArticle({ ...article });
};

export const getUserList = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getUser = (username) => {
  return newsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const postComment = (articleId, username, body) => {
  return newsApi.post(`/articles/${articleId}/comments`, {
    username: username,
    body: body,
  });
};

export const optRenderComment = (currComments, body, username, setComments) => {
  setComments([
    {
      author: username,
      created_at: Date.now(),
      body: body,
      votes: 0,
    },
    ...currComments,
  ]);
};

export const getTimeSince = (created_at) => {
  const date = new Date(created_at);
  return moment(date).fromNow();
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`);
};

export const optRenderCommentDelete = (
  currComments,
  commentId,
  setComments
) => {
  const filtered = currComments.filter(
    (comment) => comment.comment_id !== commentId
  );
  setComments(filtered);
};

export const updateCommentVotes = (commentId, vote) => {
  return newsApi.patch(`/comments/${commentId}`, { inc_votes: vote });
};

export const optRenderCommentVotes = (
  commentId,
  vote,
  comments,
  setComments
) => {
  const commentToUpdate = comments.find(
    (comment) => comment.comment_id === commentId
  );
  commentToUpdate.votes += vote;
  setComments([...comments]);
};
