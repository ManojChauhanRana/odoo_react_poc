import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { setToken } from "./api";
import logo from "../src/assets/island_innovators_logo2.png";

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("jwt_token"));

  return (
    <BrowserRouter>
      {!authed ? (
        <div style={{ padding: 20 }}>
          <LoginForm onSuccess={() => setAuthed(true)} />
        </div>
      ) : (
        <div style={styles.appContainer}>
          <div style={styles.header}>
            <div style={styles.logoContainer}>
              <img
                src={logo}
                alt="Island Innovators Logo"
                style={styles.logoImage}
              />
            </div>
            <h1 style={styles.heading}>Our Partners</h1>
          </div>

          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
            </Routes>
          </div>

          <div style={styles.footer}>
            <button
              style={styles.logoutButton}
              onClick={() => {
                setToken(undefined);
                setAuthed(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(61, 69, 77)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1rem",
  },
logoContainer: {
  border: "2px solid #fffee2",
  borderRadius: "15px",
  width: "100%",
  maxWidth: "500px", // ✅ caps desktop size
  padding: "10px",   // ✅ space inside border
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
  marginTop: "30px",
  backgroundColor: "#3d454d",
  boxSizing: "border-box" as const, // ✅ ensures padding doesn't overflow
},

logoImage: {
  width: "100%",   // ✅ scales with container
  height: "auto",
  objectFit: "contain" as const,
},
  heading: {
    textAlign: "center",
    color: "#fffee2",
    fontSize: "clamp(24px, 5vw, 50px)", // ✅ scales between 24px and 50px
    fontWeight: "bold",
    margin: "10px 0",
  },
  content: {
    flex: 1,
    margin: "20px auto",
    width: "90%",
    maxWidth: "1200px",      // ✅ constrain on large screens
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fffee2",
    color: "rgb(61, 69, 77)",
    cursor: "pointer",
    fontSize: "clamp(16px, 2vw, 25px)", // ✅ scales down on smaller screens
  },
};
