// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  plugins: [
    vue(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "tests/**/*.spec.js"],
      extension: [".js", ".vue"],
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
