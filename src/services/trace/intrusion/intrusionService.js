import http from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/intrusions", { params });
};
const get = (id) => {
  return http.get(`/trace/intrusions/${id}`);
};

const create = (data) => {
  return http.post("/trace/intrusions", data);
};

const update = (id, data) => {
  return http.put(`/trace/intrusions/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/intrusions/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/intrusions`);
};

const findByTitle = (title) => {
  return http.get(`/trace/intrusions?title=${title}`);
};

const intrusionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default intrusionService;
