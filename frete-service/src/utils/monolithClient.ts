import axios from "axios";

const client = axios.create({
  baseURL: process.env.MONOLITH_URL || "http://backend:3000/api",
  timeout: 8000,
});

export default client;