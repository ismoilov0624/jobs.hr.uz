import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // barcha qurilmalarga ochish
    port: 5173, // port (ixtiyoriy, o'zgartirsangiz kerakli manzilga kiring)
  },
});
