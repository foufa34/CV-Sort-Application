import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false, // ou ton fichier support ex: 'cypress/support/e2e.ts'
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',

    setupNodeEvents(on, config) {
      // configure les événements si nécessaire
      return config
    },
  },
})

