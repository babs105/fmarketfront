import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/admin/roles", { params });
};
const get = (id) => {
  return http.get(`/admin/roles/${id}`);
};
// const getOtherRoles = (id) => {
//   return http.get(`/security/role/${id}/otherroles`);
// };
const create = (data) => {
  return http.put("/admin/roles", data);
};
const update = (id, data) => {
  return http.patch(`/admin/roles/${id}`, data);
};
const trash = (id) => {
  return http.delete(`/admin/roles/trash/${id}`);
};
const untrash = (id) => {
  return http.post(`/admin/roles/untrash/${id}`);
};

const remove = (id) => {
  return http.delete(`/admin/roles/${id}`);
};

// const assignRole = (userId, roleId) => {
//   return http.get(`/security/role/assign/${userId}/${roleId}`);
// };
// const unassignRole = (userId, roleId) => {
//   return http.get(`/security/role/unassign/${userId}/${roleId}`);
// };

// const findByTitle = (title) => {
//   return http.get(`/security/role?title=${title}`);
// };

const roleService = {
  create,
  getAll,
  get,
  update,
  remove,
  untrash,
  trash,
  // findByTitle,
  // getOtherRoles,
  // assignRole,
  // unassignRole,
};

export default roleService;
