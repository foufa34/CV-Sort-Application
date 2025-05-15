 describe('Page d’accueil', () => {
  it('doit afficher le titre', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Hello World');
  });
});