describe("Page d’accueil", () => {
  it("doit afficher le titre", () => {
    cy.visit('http://localhost:5173');
    cy.wait(3000);
    cy.get('h1').should('contain', 'Find the perfect candidates with our CV Sorting System', {timeout: 10000}); // ou ton vrai titre
  });
});
