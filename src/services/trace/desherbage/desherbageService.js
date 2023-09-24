import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/desherbages", params);
};
const get = (id) => {
  return http.get(`/trace/desherbages/${id}`);
};

const create = (data) => {
  return http.post("/trace/desherbages", data);
};

const update = (id, data) => {
  return http.put(`/trace/desherbages/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/desherbages/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/desherbages`);
};

const findByTitle = (title) => {
  return http.get(`/trace/desherbages?title=${title}`);
};

const desherbageService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default desherbageService;
