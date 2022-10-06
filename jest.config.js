import '@babel/register';
import '@babel/polyfill';

export default {
  verbose: true,
  bail: true,
  clearMocks: true,
  collectCoverage: true,

  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**'],
  coverageDirectory: './tests/jest-coverage',
  coveragePathIgnorePatterns: [],

  coverageProvider: 'v8',

  moduleFileExtensions: [
    'js',
  ],

  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  testMatch: [
    './**/*.test.js',
  ],

  globalSetup: '<rootDir>/tests/jest.setup.js',
};