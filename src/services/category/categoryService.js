// import http from "../../../axios/http-common";
import { http } from "../../axios/http-common";

const getAll = () => {
  return http.get("/public/categories");
};
const getAllPage = (params) => {
  return http.get("/admin/categories/page", { params });
};
const get = (id) => {
  return http.get(`/admin/categories/${id}`);
};

const create = (data) => {
  return http.put("/admin/categories", data);
};

const update = (id, data) => {
  return http.patch(`/admin/categories/${id}`, data);
};
const trash = (id) => {
  return http.delete(`/admin/categories/trash/${id}`);
};
const untrash = (id) => {
  return http.post(`/admin/categories/untrash/${id}`);
};
const remove = (id) => {
  return http.delete(`/admin/categories/${id}`);
};

const removeAll = () => {
  return http.delete(`/admin/categories`);
};
const search = (params) => {
  return http.post("/admin/categories/search", params);
};

const findByTitle = (title) => {
  return http.get(`/admin/categories?title=${title}`);
};

const categoryService = {
  getAll,
  getAllPage,
  trash,
  untrash,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  search,
};

export default categoryService;
