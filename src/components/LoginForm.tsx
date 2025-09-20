import React, { useState } from "react";
import { login } from "../api";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [db, setDb] = useState("your_db_name");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(db, loginName, password);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>DB:</label>
        <input value={db} onChange={(e) => setDb(e.target.value)} />
      </div>
      <div>
        <label>Login:</label>
        <input value={loginName} onChange={(e) => setLoginName(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
