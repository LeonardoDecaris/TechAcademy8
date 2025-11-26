import axios from "axios";

const client = axios.create({
  baseURL: process.env.MONOLITH_URL || "http://backend:3000/api",
  timeout: 8000,
});

client.interceptors.request.use((cfg) => {
  (cfg as any).__ts = Date.now();
  return cfg;
});
client.interceptors.response.use(
  (res) => {
    const ms = Date.now() - ((res.config as any).__ts || Date.now());
    return res;
  },
  (err) => {
    const cfg = err?.config || {};
    const ms = Date.now() - ((cfg as any).__ts || Date.now());
    const st = err?.response?.status;
    return Promise.reject(err);
  }
);

export default client;