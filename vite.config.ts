import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // your React dev port
    proxy: {
      "/api": {
        target: "http://localhost:8069", // Odoo backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
