import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["jcwsgwcccooggww4ckgwg4c8.95.216.50.19.sslip.io"],
  },
});
