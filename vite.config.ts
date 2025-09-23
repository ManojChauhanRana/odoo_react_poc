import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/', // must be "/" if app is served from root
  plugins: [react()],
});
