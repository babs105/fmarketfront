// import axios from "axios";
// import authHeader from "../services/auth/authHeader";

// export default axios.create({
//   // baseURL: "http://localhost:8080",
//   // baseURL: "http://backoffice-service:8080",
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     "Content-type": "application/json",
//     // ...authHeader(),
//     Authorization:
//       localStorage.getItem("user") &&
//       "Bearer " + JSON.parse(localStorage.getItem("user")),
//   },
// });
import axios from "axios";
import authService from "../services/auth/authService";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// if (authService.isLogged()) {
//   console.log("is logging");
//   const token = JSON.parse(localStorage.getItem("user"));

//   console.log("token", token);
//   // api.defaults.headers.common["Content-type"] = "application/json";
//   http.defaults.headers.common["Authorization"] = "Bearer " + token;
// }
http.interceptors.request.use((request) => {
  if (authService.isLogged()) {
    request.headers.Authorization = "Bearer " + authService.getToken();
  }
  return request;
});

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       authService.logout();
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
export const setupResponseInterceptor = (navigate) => {
  http.interceptors.response.use(
    (response) => {
      console.log("response", response);
      return response;
    },
    (error) => {
      console.log("error", error.response);
      if (error.response.status === 401) {
        authService.logout();
        // navigate("/auth/login");
        navigate("/error/401");
      } else if (error.response.status === 403) {
        console.log("Unauthorize");
        navigate("/error/403");
      } else {
        return Promise.reject(error);
      }
    }
  );
};
