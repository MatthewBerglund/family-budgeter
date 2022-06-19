import '@testing-library/cypress/add-commands';

const TEST_MONTH = 'February 2022';

describe('Modal confirmation deletion', () => {
  before(() => {
    cy.intercept('GET', '**/items*', { fixture: 'expense-array' }).as('getExpenseArray');
    cy.visit('/');
    cy.wait('@getExpenseArray');
  });

  beforeEach(() => {
    cy.intercept('DELETE', '**/items/**', {}).as('deleteExpense');
  });

  it('selects test month', () => {
    cy.findByRole('combobox', { name: /select a month/i }).select(TEST_MONTH);
  });

  it('selects oldest expense in month', () => {
    cy.get('[data-cy="expenses"] > li').as('history');
    cy.get('@history').last().as('toBeDeleted');
    cy.get('@toBeDeleted').within(() => {
      cy.get('[data-cy="deleteButton"]').click();
    });
  });

  it('confirms deletion of the expense', () => {
    cy.get('[id="Confirm expense deletion"]').should('be.visible');
  });
});
