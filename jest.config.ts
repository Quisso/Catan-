/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/catan-project/tests/**/*.(spec|test).ts'],
  verbose: true,
};