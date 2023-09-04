import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://msmi-news.onrender.com/api",
});

export const getArticles = (sortBy = undefined) => {
  return newsApi
    .get("/articles", {
      params: {
        sort_by: sortBy,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};
