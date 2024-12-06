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
    reporters: [
      "default",
      ["vitest-sonar-reporter", { outputFile: "reports/test-report.xml" }],
    ],
    coverage: {
      provider: "v8", // Utilise le provider V8 pour générer la couverture
      reporter: ["text", "lcov"], // Génère un rapport lcov compatible
      reportsDirectory: "./coverage", // Dossier où les rapports seront générés
    },
  },
});
