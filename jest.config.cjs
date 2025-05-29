/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ "**/tests/integration/**/*.[jt]s?(x)"], // Ajoutez cette ligne
};
