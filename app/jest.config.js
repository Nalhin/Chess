module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: ['jest-emotion'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  testRegex: "/__tests__/.*\\.(ts|tsx|js)$",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ]
};
