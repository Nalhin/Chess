module.exports = {
  snapshotSerializers: ['jest-emotion'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  testRegex: "/__tests__/.*\\.(ts|tsx|js)$",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  setupFilesAfterEnv: ['./test/setup/setup.js'],
};
