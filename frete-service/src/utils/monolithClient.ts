import axios from "axios";

const MONOLITH_URL = process.env.MONOLITH_URL;
if (!MONOLITH_URL) {
  console.error("MONOLITH_URL não está definido nas variáveis de ambiente");
  process.exit(1);
}

const client = axios.create({
  baseURL: MONOLITH_URL,
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