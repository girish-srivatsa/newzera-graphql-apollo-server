module.exports = {
  testMatch: ["<rootDir>/tests/**/*.js", "((\\.|/*.)(spec|test))\\.js?$"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
};
