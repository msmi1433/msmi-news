import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://msmi-news.onrender.com/api",
});

export const getArticles = (sortBy = undefined, page = undefined) => {
  return newsApi
    .get("/articles", {
      params: {
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

export const getNumOfPages = () => {
  return newsApi.get("/articles?limit=1000").then(({ data }) => {
    return Math.ceil(data.articles.length / 10);
  });
};

export const getArticleComments = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};
