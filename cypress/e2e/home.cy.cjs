/* jshint esversion: 6 */
describe("Page d’accueil", () => {
    it("doit afficher le titre", () => {
        cy.visit('/');
        cy.get('h1').should('contain', 'Find the perfect candidates with our CV Sorting System'); // ou ton vrai titre
    });
});
