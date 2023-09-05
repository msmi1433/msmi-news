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

export const getNumOfPages = () => {
  return newsApi.get("/articles?limit=1000").then(({ data }) => {
    return Math.ceil(data.articles.length / 10);
  });
};
