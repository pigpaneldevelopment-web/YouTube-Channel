import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/YouTube-Channel/sop-trainer/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
