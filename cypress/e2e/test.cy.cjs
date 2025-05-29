describe('Homepage', () => {
    it('should load successfully', () => {
        cy.visit('/');
        cy.contains('Find the perfect candidates with our CV Sorting System'); // adapte au texte réel de ta page
    });
});
