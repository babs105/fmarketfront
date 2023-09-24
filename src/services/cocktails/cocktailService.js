// import http from "../../../axios/http-common";
import { http } from "../../axios/http-common";

const getAll = (params) => {
  return http.get("/public/cocktails", { params });
};
const get = (id) => {
  return http.get(`/public/cocktails/${id}`);
};

const create = (data) => {
  return http.put("/admin/cocktails", data);
};

const update = (id, data) => {
  return http.patch(`/admin/cocktails/${id}`, data);
};
const deleteImageProduct = (id, data) => {
  return http.patch(`/admin/cocktails/deleteImage/${id}`, data);
};

const trash = (id) => {
  return http.delete(`/admin/cocktails/trash/${id}`);
};
const untrash = (id) => {
  return http.post(`/admin/cocktails/untrash/${id}`);
};

const remove = (id) => {
  return http.delete(`/admin/cocktails/${id}`);
};
// const search = (params) => {
//   return http.post("/cocktails/search", params);
// };

// const findByTitle = (title) => {
//   return http.get(`/cocktails?title=${title}`);
// };

const cocktailservice = {
  getAll,
  get,
  create,
  update,
  trash,
  remove,
  untrash,
  deleteImageProduct,
  // findByTitle,
  // search,
};

export default cocktailservice;
