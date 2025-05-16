// cypress/support/e2e.ts

// Import commands.js using ES modules syntax:
import './commands'

// Alternatively, si tu n’as pas encore créé commands.ts, tu peux commenter la ligne ci-dessus.

// Ce fichier peut contenir des hooks globaux, par exemple :
before(() => {
  // Code à exécuter une fois avant tous les tests
  cy.log('Début des tests E2E')
})

after(() => {
  // Code à exécuter une fois après tous les tests
  cy.log('Fin des tests E2E')
})

// Tu peux aussi ajouter ici des commandes personnalisées avec Cypress.Commands.add()
