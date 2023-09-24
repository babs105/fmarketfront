import { http } from "../../../axios/http-common";

const getAll = (params) => {
  return http.get("report/trace/evenements", { params });
};
const get = (id) => {
  return http.get(`/trace/evenementReports/${id}`);
};

const create = (data) => {
  return http.post("/trace/evenementReports", data);
};

const update = (id, data) => {
  return http.put(`/trace/evenementReports/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/trace/evenementReports/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/trace/evenementReports`);
};

const findByTitle = (title) => {
  return http.get(`/trace/evenementReports?title=${title}`);
};
const search = (params) => {
  return http.post("/report/trace/evenements/search", params);
};
const genererExcel = (data) => {
  return http.post("/report/trace/evenements/export/excel", data, {
    responseType: "arraybuffer",
  });
};

const evenementReportService = {
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

export default evenementReportService;
