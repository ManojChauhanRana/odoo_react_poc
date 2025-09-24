import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/island_innovators_logo2.png";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(loginName, password);
      onSuccess?.();
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Island Innovators Logo" style={styles.logoImage} />
        </div>
      </div>

      {/* Login Card */}
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          <form onSubmit={submit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Login</label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your login"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
              />
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {}),
              }}
            >
              {isLoading ? "Signing In..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogoSection}>
            <img
              src={logo}
              alt="Island Innovators Logo"
              style={styles.footerLogoImage}
            />
          </div>
          <div style={styles.footerText}>
            Contact Us{" "}
            <a href="mailto:hello@islandinnovators.org" style={styles.footerLink}>
              hello@islandinnovators.org
            </a>
          </div>
          <div style={styles.footerText}>
            Follow us on Instagram{" "}
            <a href="#" style={styles.footerLink}>
              📷
            </a>
          </div>
        </div>
      </div>
    </div>
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
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "1rem",
    width: "100%",
  },
  logoContainer: {
    border: "2px solid #fffee2",
    borderRadius: "15px",
    maxWidth: "100%", // ✅ responsive
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    backgroundColor: "#3d454d",
  },
  logoImage: {
    maxWidth: "100%", // ✅ scales down
    height: "auto",
    objectFit: "contain" as const,
  },
  cardWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "2rem",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#fffee2",
    borderRadius: "24px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    color: "rgb(61, 69, 77)",
    fontSize: "0.875rem",
    fontWeight: 500,
    margin: 0,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "white",
    border: "1px solid rgb(229, 231, 235)",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#333",
  },
  errorContainer: {
    backgroundColor: "rgb(254, 226, 226)",
    border: "1px solid rgb(248, 113, 113)",
    color: "rgb(153, 27, 27)",
    padding: "12px 16px",
    borderRadius: "8px",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "rgb(61, 69, 77)",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  footer: {
    padding: "1rem 0",
    backgroundColor: "transparent",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap", // ✅ wraps on small screens
    gap: "1rem",
    textAlign: "center", // ✅ aligns nicely on mobile
  },
  footerLogoSection: {
    display: "flex",
    justifyContent: "center",
    flex: "1 1 100%", // ✅ full width on mobile
  },
  footerLogoImage: {
    height: "100px", // ✅ smaller
    maxWidth: "200px",
    objectFit: "contain" as const,
  },
  footerText: {
    color: "#fffee2",
    flex: "1 1 100%", // ✅ full width text on mobile
  },
  footerLink: {
    color: "#60a5fa",
    textDecoration: "none",
  },
};
