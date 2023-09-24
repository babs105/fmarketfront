import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/balayages", params);
};
const get = (id) => {
  return http.get(`/trace/balayages/${id}`);
};

const create = (data) => {
  return http.post("/trace/balayages", data);
};

const update = (id, data) => {
  return http.put(`/trace/balayages/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/balayages/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/balayages`);
};

const findByTitle = (title) => {
  return http.get(`/trace/balayages?title=${title}`);
};

const balayageService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default balayageService;
