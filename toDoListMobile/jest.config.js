module.exports = {
  preset: 'react-native',
  testTimeout: 60000,
  bail: 0,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/src/tests/*.tsx'],
};
