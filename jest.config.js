/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  testPathIgnorePatterns: ["src/__tests__/setupTests.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.(tsx)",
    "!src/**/*.test.(tsx)",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts']
};


module.exports = createJestConfig(customJestConfig)