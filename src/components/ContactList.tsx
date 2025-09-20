import React, { useEffect, useState } from "react";
import { fetchContacts } from "../api";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts()
      .then(setContacts)
      .catch((e) => setError(e.message || "Failed to fetch"));
  }, []);

  if (error) return <div style={styles.error}>{error}</div>;
  if (!contacts.length) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {contacts.map((c) => (
          <div
            key={c.id}
            style={styles.card}
            onClick={() => navigate(`/contacts/${c.id}`)}
          >
            <img
              src={
                c.image_1920
                  ? `data:image/png;base64,${c.image_1920}`
                  : "https://via.placeholder.com/100x100?text=No+Image"
              }
              alt={c.name}
              style={styles.image}
            />
            <div style={styles.info}>
              <h3 style={styles.name}>{c.name}</h3>
              {c.email && <p style={styles.text}>📧 {c.email}</p>}
              {c.phone && <p style={styles.text}>📞 {c.phone}</p>}
              {c.city && <p style={styles.text}>📍 {c.city}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "rgb(61, 69, 77)", // dark background for page
    minHeight: "100vh",
    fontFamily: "Instrument, sans-serif",
    padding: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
    gap: 16,
  },
  card: {
    background: "#fffee2", // light card
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    margin: "0 0 8px",
    color: "rgb(61, 69, 77)", // dark text for contrast
    fontWeight: 600,
  },
  text: {
    margin: "4px 0",
    fontSize: 14,
    color: "rgb(61, 69, 77)", // dark text for contrast
    wordBreak: "break-word",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    color: "#fffee2",
  },
};
