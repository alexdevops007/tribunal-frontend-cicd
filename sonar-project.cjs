const scanner = require("sonarqube-scanner").default;

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_834b427eac9a15c962524ee45daa376c38292553",
    options: {
      "sonar.projectKey": "gestion-tribunaux",
      "sonar.projectName": "Gestion Tribunaux Vue.js",
      "sonar.projectDescription": 'Description for "My App" project...',
      "sonar.projectVersion": "1.0",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.js,**/*.spec.js,node_modules/**",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.test.inclusions": "src/**/*.spec.js",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
      "sonar.qualitygate.wait": "true", // Attendre les résultats des Quality Gates
    },
  },
  (error) => {
    if (error) {
      console.error(error);
    }
    process.exit();
  }
);
