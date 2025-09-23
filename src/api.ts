import axios from "axios";

// ✅ Use relative base URL for dev proxy (Vite) and production reverse proxy
// const API_BASE = import.meta.env.VITE_API_BASE || "/api";
const API_BASE = "https://islandinnovators-react-odoo-integration-23954454.dev.odoo.com/odoo";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// set token if present
export function setToken(token?: string) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("jwt_token", token);
  } else {
    delete instance.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt_token");
  }
}

// try to set token from storage on load
const stored = localStorage.getItem("jwt_token");
if (stored) setToken(stored);

export async function login(db: string, login: string, password: string) {
  const res = await instance.post("/login", { db, login, password });
  if (res.data && res.data.token) {
    setToken(res.data.token);
    return res.data;
  }
  throw new Error(res.data.error || "Login failed");
}

export async function fetchContacts() {
  const res = await instance.get("/contacts");
  return res.data.contacts;
}

// ✅ Fetch single contact by ID
export async function fetchContactById(id: number) {
  const res = await instance.get(`/contacts/${id}`);
  return res.data.contact;
}
