import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/nettoyages", params);
};
const get = (id) => {
  return http.get(`/trace/nettoyages/${id}`);
};

const create = (data) => {
  return http.post("/trace/nettoyages", data);
};

const update = (id, data) => {
  return http.put(`/trace/nettoyages/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/nettoyages/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/nettoyages`);
};

const findByTitle = (title) => {
  return http.get(`/trace/nettoyages?title=${title}`);
};

const nettoyageService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default nettoyageService;
