import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("/trace/remorquages", params);
};
const get = (id) => {
  return http.get(`/trace/remorquages/${id}`);
};

const create = (data) => {
  return http.post("/trace/remorquages", data);
};

const update = (id, data) => {
  return http.put(`/trace/remorquages/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/remorquages/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/remorquages`);
};

const findByTitle = (title) => {
  return http.get(`/trace/remorquages?title=${title}`);
};
const search = (params) => {
  return http.post("/trace/remorquages/search", params);
};
const genererExcel = (data) => {
  return http.post("/trace/remorquages/search/excel", data, {
    responseType: "arraybuffer",
  });
};

const remorquageService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  search,
  genererExcel,
};

export default remorquageService;
