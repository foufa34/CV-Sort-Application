describe('Homepage', () => {
  it('should load successfully', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Find the perfect candidates with our CV Sorting System') ;// adapte au texte réel de ta page
  });
});
