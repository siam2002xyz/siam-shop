import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  // baseURL: 'https://ecommerce-5262.onrender.com',
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const cookie = document.cookie;
    // Handle token here ...
    const configCookie = decodeURIComponent(cookie).split(";");
    // console.log(configCookie)
    if (cookie?.length > 0) {
      config.headers["Cookie"] = `${cookie}`; // set cookie send to server
    }
    config.headers["Authorization"] = `Bearer ${configCookie[0].split("=")[1]}`;
    // config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error) {
      return localStorage.removeItem("id_user");
    }
    throw error;
  },
  (error) => {
    //unauthorised error
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      history.replace({ pathname: "/error" });
    }
    //internal server error
    else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    }
    //any other error
    else return Promise.reject(error);
  }
);

export default axiosClient;
