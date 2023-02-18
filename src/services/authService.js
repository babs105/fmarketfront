import http from "../axios/http-common";

const register = (data) => {
  return http.post("/security/user/signup", { ...data });
};

const login = (data) => {
  return http.post("/security/user/signin", { ...data }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
