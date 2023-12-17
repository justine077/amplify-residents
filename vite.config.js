import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  presets: [
    ["@babel/preset-env", { targets: "last 2 versions" }],
    "@babel/preset-react",
  ],
  plugins: [react()],
});
