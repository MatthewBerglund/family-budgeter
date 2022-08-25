import '@testing-library/cypress/add-commands';

describe('Alert add expense - fail', () => {
  before(() => {
    cy.clearDatabase();
  });

  after(() => {
    cy.clearDatabase();
  });

  it('adds the expense', () => {
    cy.visit('/');
    cy.addExpenseFromFixture('expense-raw');
    cy.wait(100);
  });

  it('checks if the alert is correctly rendered', () => {
    cy.findByRole('alert').should(
      'contain',
      'The expense could not be added. Please try again.'
    );
  });

  it('checks that alert is automatically closed', () => {
    cy.findByRole('alert').wait(5000).should('not.be.visible');
  });
});
