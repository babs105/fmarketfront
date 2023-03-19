import http from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/carburant/ravitaillements", { params });
};
const get = (id) => {
  return http.get(`/carburant/ravitaillements/${id}`);
};

const create = (data) => {
  return http.post("/carburant/ravitaillements", data);
};

const update = (id, data) => {
  return http.put(`/carburant/ravitaillements/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/carburant/ravitaillements/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/carburant/ravitaillements`);
};

const findByTitle = (title) => {
  return http.get(`/carburant/ravitaillements?title=${title}`);
};

const ravitaillementservice = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ravitaillementservice;
