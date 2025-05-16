import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ou le port utilisé par ton app
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',

    // Si tu veux voir la console dans les logs GitHub Actions
    setupNodeEvents(on, config) {
      // ajouter des plugins ici si nécessaire
      return config
    },
  },
})
