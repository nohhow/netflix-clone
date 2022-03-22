import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params : {
        api_key: "e14409facdc2c58de314693efe970e32",
        language: "ko-KR",
    },
});

export default instance;