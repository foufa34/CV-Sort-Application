import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    pageLoadTimeout: 100000, // augmente le délai de chargement complet
    defaultCommandTimeout: 10000 // augmente le délai par commande
  }
})

