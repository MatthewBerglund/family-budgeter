import '@testing-library/cypress/add-commands';

describe('Alert add expense - fail', () => {
  before(() => {
    cy.intercept('GET', '**/items*', []).as('getExpenses');
    cy.visit('/');
    cy.wait('@getExpenses');
  });

  beforeEach(() => {
    cy.intercept('POST', '**/items*', { statusCode: 500 }).as('postExpenseFail');
  });

  it('adds the expense', () => {
    cy.addExpenseFromFixture('expense-raw');
    cy.wait('@postExpenseFail');
  });

  it('checks if the alert is correctly rendered', () => {
    cy.findByRole('alert').should('contain', 'The expense could not be added. Please try again.');
  });

  it('checks that alert is automatically closed', () => {
    cy.findByRole('alert').wait(5000).should('not.exist');
  });
});
