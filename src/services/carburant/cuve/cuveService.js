import http from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/carburant/cuves", { params });
};
const get = (id) => {
  return http.get(`/carburant/cuve/${id}`);
};

const create = (data) => {
  return http.post("/carburant/cuves", data);
};
const update = (id, data) => {
  return http.put(`/carburant/cuve/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/carburant/cuve/delete/${id}`);
};

const findByTitle = (title) => {
  return http.get(`/carburant/cuve?title=${title}`);
};

const cuveService = {
  create,
  getAll,
  get,
  update,
  remove,
  findByTitle,
};

export default cuveService;
