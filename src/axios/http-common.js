import axios from "axios";
import authHeader from "../services/auth/authHeader";

export default axios.create({
  // baseURL: "http://localhost:8080",
  // baseURL: "http://backoffice-service:8080",
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    ...authHeader(),
  },
});
