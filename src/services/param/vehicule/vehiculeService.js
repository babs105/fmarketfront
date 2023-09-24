import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/paramvhl/vehicles", { params });
};
const get = (id) => {
  return http.get(`/paramvhl/vehicles/${id}`);
};
const getVehiculeByAffectation = (affectation) => {
  return http.get(`/paramvhl/vehicles/vehicleByAffectation/${affectation}`);
};
const create = (data) => {
  return http.post("/paramvhl/vehicles", data);
};

const update = (id, data) => {
  return http.put(`/paramvhl/vehicles/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/paramvhl/vehicles/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/paramvhl/vehicles`);
};

const findByTitle = (title) => {
  return http.get(`/paramvhl/vehicles?title=${title}`);
};

const vehiculeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getVehiculeByAffectation,
};

export default vehiculeService;
