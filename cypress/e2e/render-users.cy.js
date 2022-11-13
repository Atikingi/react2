describe('render users from API', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-alfa');
    cy.intercept('GET', 'https://randomuser.me/api/?results=6').as('getUsers');
  });

  it('should be render users cards with buttons', () => {
    cy.wait('@getUsers');

    cy.get('[data-test-id="user-card"]').should('have.length', 12);
    cy.get('[data-test-id="delete-button"]').should('have.length', 12);
    cy.get('[data-test-id="favorite-button"]').should('have.length', 12);
  });
});
