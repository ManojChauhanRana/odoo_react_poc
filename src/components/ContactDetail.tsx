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

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!contact) return <div>Loading...</div>;

  return (
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
        <h2>{contact.name}</h2>
        {contact.email && <p>📧 Email: {contact.email}</p>}
        {contact.phone && <p>📞 Phone: {contact.phone}</p>}
        {contact.mobile && <p>📱 Mobile: {contact.mobile}</p>}
        {contact.street && <p>🏠 Street: {contact.street}</p>}
        {contact.city && <p>📍 City: {contact.city}</p>}
        {contact.country_id && <p>🌍 Country: {contact.country_id[1]}</p>}
      </div>
    </div>
  );
}

const detailStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
};
