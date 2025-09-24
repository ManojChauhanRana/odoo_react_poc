import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContactById } from "../api";

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchContactById(parseInt(id))
        .then(setContact)
        .catch((e) => setError(e.message || "Failed to fetch contact"));
    }
  }, [id]);

  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  if (!contact) return <div style={{ textAlign: "center", color: "#fffee2" }}>Loading...</div>;

  return (
    <div style={detailStyles.page}>
      <div style={detailStyles.container}>
        <img
          src={
            contact.image_1920
              ? `data:image/png;base64,${contact.image_1920}`
              : "https://via.placeholder.com/150x150?text=No+Image"
          }
          alt={contact.name}
          style={detailStyles.image}
        />
        <div style={detailStyles.info}>
          <h2 style={detailStyles.name}>{contact.name}</h2>
          {contact.email && <p style={detailStyles.text}>📧 {contact.email}</p>}
          {contact.phone && <p style={detailStyles.text}>📞 {contact.phone}</p>}
          {contact.mobile && <p style={detailStyles.text}>📱 {contact.mobile}</p>}
          {contact.street && <p style={detailStyles.text}>🏠 {contact.street}</p>}
          {contact.city && <p style={detailStyles.text}>📍 {contact.city}</p>}
          {contact.country_id && <p style={detailStyles.text}>🌍 {contact.country_id[1]}</p>}
        </div>
      </div>
    </div>
  );
}

const detailStyles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "rgb(61, 69, 77)", // dark background
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
    background: "#fffee2",
    borderRadius: "12px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flexWrap: "wrap", // ensures content wraps on small screens
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    margin: "0 auto", // centers on small screens
  },
  info: {
    flex: 1,
    minWidth: "200px",
  },
  name: {
    margin: "0 0 12px",
    fontWeight: 600,
    color: "rgb(61, 69, 77)",
  },
  text: {
    margin: "6px 0",
    fontSize: "14px",
    color: "rgb(61, 69, 77)",
    wordBreak: "break-word",
  },
};
