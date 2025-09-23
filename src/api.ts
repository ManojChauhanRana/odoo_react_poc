import axios from "axios";

// ✅ Direct Odoo.sh API base
const API_BASE = "https://islandinnovators-react-odoo-integration-23960110.dev.odoo.com/api";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ✅ Set or remove token in axios headers and localStorage
export function setToken(token?: string) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("jwt_token", token);
  } else {
    delete instance.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt_token");
  }
}

// ✅ Try to set token from storage on load
const stored = localStorage.getItem("jwt_token");
if (stored) setToken(stored);

// ✅ Login function
export async function login(login: string, password: string) {
  const res = await instance.post("/login", { login, password });
  if (res.data?.token) {
    setToken(res.data.token);
    return res.data;
  }
  throw new Error(res.data?.error || "Login failed");
}

// ✅ Fetch all contacts
export async function fetchContacts() {
  const res = await instance.get("/contacts");
  return res.data.contacts;
}

// ✅ Fetch single contact by ID
export async function fetchContactById(id: number) {
  const res = await instance.get(`/contacts/${id}`);
  return res.data.contact;
}
