import http from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/paramvhl/affectations", { params });
};
const getAllAffectations = () => {
  return http.get("/paramvhl/affectations/all");
};
const get = (id) => {
  return http.get(`/paramvhl/affectation/${id}`);
};

const create = (data) => {
  return http.post("/paramvhl/affectations", data);
};
const update = (id, data) => {
  return http.put(`/paramvhl/affectation/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/paramvhl/affectation/delete/${id}`);
};

const findByTitle = (title) => {
  return http.get(`/paramvhl/affectation?title=${title}`);
};

const affectationService = {
  create,
  getAll,
  get,
  update,
  remove,
  findByTitle,
  getAllAffectations,
};

export default affectationService;
