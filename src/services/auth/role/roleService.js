import http from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/security/roles", { params });
};
const get = (id) => {
  return http.get(`/security/role/${id}`);
};
const getOtherRoles = (id) => {
  return http.get(`/security/role/${id}/otherroles`);
};
const create = (data) => {
  return http.post("/security/roles", data);
};
const update = (id, data) => {
  return http.put(`/security/role/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/security/role/delete/${id}`);
};

const assignRole = (userId, roleId) => {
  return http.get(`/security/role/assign/${userId}/${roleId}`);
};
const unassignRole = (userId, roleId) => {
  return http.get(`/security/role/unassign/${userId}/${roleId}`);
};

const findByTitle = (title) => {
  return http.get(`/security/role?title=${title}`);
};

const roleService = {
  create,
  getAll,
  get,
  update,
  remove,
  findByTitle,
  getOtherRoles,
  assignRole,
  unassignRole,
};

export default roleService;
