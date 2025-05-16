describe('Homepage', () => {
  it('should load successfully', () => {
    cy.visit('/')
    cy.contains('Bienvenue') // adapte au texte réel de ta page
  })
})
