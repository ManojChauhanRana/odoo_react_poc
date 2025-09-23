import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { setToken } from "./api";
import logo from "C:/react_s/odoo_react_poc/src/logo/island_innovators_logo2.png";

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
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
          <img src={logo} alt="Island Innovators Logo" style={styles.logoImage} />
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
     padding: "0px 0px", 

  },
  logoImage: {
    width: "400px",
    height: "100px",
    marginBottom: "-30px",
    objectFit: 'contain' as const, 
  },
  logoContainer: {
  border: "2px solid #fffee2",
  borderRadius: "15px",
  width: "1280px",        
  padding: "1px",            
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1px",
  marginTop: "30px" ,      
  backgroundColor: "#3d454d",  
},

  heading: {
    textAlign: "center",
    color: "#fffee2", 
    fontSize: "50px",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    margin: "20px auto",
    width: "90%",
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
    fontSize: "25px",
  },
};
