import '@testing-library/cypress/add-commands';

const EXPENSE_MONTH = 'March 2022';

describe('Modal confirm month selection', () => {
  before(() => {
    cy.intercept('GET', '**/items*', []).as('getExpenses');
    cy.visit('/');
    cy.wait('@getExpenses');
  });

  beforeEach(() => {
    cy.intercept('POST', '**/items*', { fixture: 'expense-post' }).as('postExpense');
  });

  it('adds the expense', () => {
    cy.addExpenseFromFixture('expense-raw');
    cy.wait('@postExpense');
  });

  it('checks that the modal is correctly rendered', () => {
    cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).should('be.visible');
  });
});
