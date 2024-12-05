export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js",
    "!**/node_modules/**",
  ],
  coverageReporters: ["lcov", "text-summary"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  testMatch: ["**/tests/unit/**/*.spec.js"],
};
