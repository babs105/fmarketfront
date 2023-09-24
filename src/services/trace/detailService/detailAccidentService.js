import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/detailAccidents", { params });
};
const get = (id) => {
  return http.get(`/trace/detailAccidents/${id}`);
};

const create = (data) => {
  return http.post("/trace/detailAccidents", data);
};

const update = (id, data) => {
  return http.put(`/trace/detailAccidents/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/detailAccidents/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/detailAccidents`);
};

const findByTitle = (title) => {
  return http.get(`/trace/detailAccidents?title=${title}`);
};
const search = (params) => {
  return http.post("/trace/detailAccidents/search", params);
};

const detailAccidentservice = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  search,
};

export default detailAccidentservice;
