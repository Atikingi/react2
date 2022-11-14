describe('users cards actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-alfa');
    cy.intercept('GET', 'https://randomuser.me/api/?results=6').as('getUsers');
  });

  it('should change color then click favorite button', () => {
    cy.wait('@getUsers');

    cy.get('[data-test-id="favorite-button"]').as('favoriteButton');

    cy.get('@favoriteButton').first().should('be.visible').click();
    cy.get('@favoriteButton').first().should('have.css', 'color', 'rgb(239, 49, 36)');
    cy.get('@favoriteButton').first().should('be.visible').click();
    cy.get('@favoriteButton').first().should('have.css', 'color', 'rgb(60, 76, 93)');
  });

  it('should delete card then click delete button', () => {
    cy.wait('@getUsers');

    cy.get('[data-test-id="delete-button"]').as('deleteButton');
    cy.get('[data-test-id="user-card"]').as('userCard');

    cy.get('@deleteButton').first().should('be.visible').click();
    cy.get('@userCard').should('have.length', 11);
  });

  it('should added to favorite after click on favorite button', () => {
    cy.wait('@getUsers');

    cy.get('[data-test-id="favorite-button"]').as('favoriteButton');
    cy.get('[data-test-id="switch-favorite"]').as('switchButton');
    cy.get('[data-test-id="user-card"]').as('userCard');

    cy.get('@favoriteButton').first().should('be.visible').click();
    cy.get('@switchButton').first().click({ force: true });
    cy.get('@userCard').should('have.length', 1);

    cy.get('@switchButton').first().click({ force: true });
    cy.get('@userCard').should('have.length', 12);
  });

  it('should refresh user card and set count 6', () => {
    cy.wait('@getUsers');

    cy.get('[data-test-id="refresh-button"]').as('refreshButton');
    cy.get('[data-test-id="user-card"]').as('userCard');

    cy.get('@refreshButton').click();
    cy.get('@userCard').should('have.length', 6);
  });
});
