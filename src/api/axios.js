import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "6d5dddd3f5d9d13c74e37b8e58006df8",
    language: "ko-KR",
  },
});

export default instance;
