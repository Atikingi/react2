describe('users cards actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-alfa');
    cy.intercept('GET', 'https://randomuser.me/api/?results=6').as('getUsers');
  });

  it('should be change color then click favorite button', () => {
    cy.wait('@getUsers');

    const favoriteButton = cy.get('[data-test-id="favorite-button"]');

    favoriteButton.first().should('be.visible').click();
    favoriteButton.first().should('have.css', 'color', 'rgb(239, 49, 36)');
    favoriteButton.first().should('be.visible').click();
    favoriteButton.first().should('have.css', 'color', 'rgb(60, 76, 93)');
  });

  it('should be delete card then click delete button', () => {
    cy.wait('@getUsers');

    const deleteButton = cy.get('[data-test-id="delete-button"]');

    deleteButton.first().should('be.visible').click();
    cy.get('[data-test-id="user-card"]').should('have.length', 11);
  });

  it('should be added to favorite after click on favorite button', () => {
    cy.wait('@getUsers');

    const favoriteButton = cy.get('[data-test-id="favorite-button"]');
    const switchButton = cy.get('[data-test-id="switch-favorite"]');

    favoriteButton.first().should('be.visible').click();
    switchButton.first().click({ force: true });
    cy.get('[data-test-id="user-card"]').should('have.length', 1);

    switchButton.first().click({ force: true });
    cy.get('[data-test-id="user-card"]').should('have.length', 12);
  });

  it('should be refresh user card and set count 6', () => {
    cy.wait('@getUsers');

    const refreshButton = cy.get('[data-test-id="refresh-button"]');

    refreshButton.click();
    cy.get('[data-test-id="user-card"]').should('have.length', 6);
  });
});
