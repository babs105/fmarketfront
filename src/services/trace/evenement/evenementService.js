// import http from "../../../axios/http-common";
import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/evenements", { params });
};
const get = (id) => {
  return http.get(`/trace/evenements/${id}`);
};

const create = (data) => {
  return http.post("/trace/evenements", data);
};

const update = (id, data) => {
  return http.put(`/trace/evenements/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/evenements/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/evenements`);
};
const search = (params) => {
  return http.post("/trace/evenements/search", params);
};

const findByTitle = (title) => {
  return http.get(`/trace/evenements?title=${title}`);
};

const evenementService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  search,
};

export default evenementService;
