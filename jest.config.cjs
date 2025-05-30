/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testMatch: [
    "**/tests/unit/**/*.test.[jt]s?(x)",
    "**/tests/integration/**/*.test.[jt]s?(x)",
    "**/tests/e2e/**/*.spec.[jt]s?(x)" // optionnel si tu veux tester e2e aussi
  ],
  testPathIgnorePatterns: ["/node_modules/"],
};

