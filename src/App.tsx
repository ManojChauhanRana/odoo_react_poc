import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { setToken } from "./api";

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("jwt_token"));

  if (!authed) {
    return (
      <div style={{ padding: 20 }}>
        <LoginForm onSuccess={() => setAuthed(true)} />
      </div>
    );
  }

  return (
   <BrowserRouter>
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
    <h1 style={{ textAlign: "center" }}>Our Partners</h1>
    <div style={{ flex: 1, margin: "0 auto" }}>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
      </Routes>
    </div>
        <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
      <button
        onClick={() => {
          setToken(undefined);
          setAuthed(false);
        }}
      >
        Logout
      </button>
    </div>
  </div>
</BrowserRouter>

  );
}
