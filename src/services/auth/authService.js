import { useDispatch } from "react-redux";
import { http } from "../../axios/http-common";

const register = (data) => {
  return http.put("/public/auth/register", { ...data });
};

const login = (data) => {
  return http.post("/public/auth/login", { ...data }).then((response) => {
    if (response.data) {
      localStorage.setItem("dataUser", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("dataUser");
};
const isLogged = () => {
  const token = JSON.parse(localStorage.getItem("dataUser"));
  return !!token;
};

const hasRole = (roles, role) => {
  return roles.includes(role);
};
const isTokenExpired = (token) => {
  try {
    const decodedJwt = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    // return JSON.parse(atob(token.split(".")[1]));
    console.log("USER  TOKEN", decodedJwt);
    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log("expier");
      localStorage.removeItem("user");
      return true;
    } else {
      console.log("not expier");
      return false;
    }
  } catch (error) {
    // return null;
    console.log("EEroor", error.response);
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("dataUser"));
};
const getToken = () => {
  const token = JSON.parse(localStorage.getItem("dataUser")).token;
  return token;
};

const get = (id) => {
  return http.get(`/private/users/${id}`);
};

const update = (id, data) => {
  return http.patch(`/private/users/${id}`, data);
};
// const getByUsername = (username) => {
//   return http.get(`/private/user/username/${username}`);
// };

const getAllUsersPage = (params) => {
  return http.get("/admin/users", { params });
};
const getOtherRoles = (id) => {
  return http.get(`/admin/users/otherrole/${id}`);
};

const trash = (id) => {
  return http.delete(`/admin/users/trash/${id}`);
};
const untrash = (id) => {
  return http.post(`/admin/users/untrash/${id}`);
};
const remove = (id) => {
  return http.delete(`/admin/users/delete/${id}`);
};

const assignRole = (data) => {
  return http.post("/admin/users/assignrole", data);
};
const unassignRole = (data) => {
  return http.post("/admin/users/unassignrole", data);
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsersPage,
  get,
  update,
  remove,
  trash,
  untrash,
  getOtherRoles,
  assignRole,
  unassignRole,
  // getByUsername,
  isLogged,
  isTokenExpired,
  hasRole,
  getToken,
};

export default authService;
