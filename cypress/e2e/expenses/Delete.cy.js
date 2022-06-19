import '@testing-library/cypress/add-commands';

const TEST_MONTH = 'February 2022';

describe('Delete expense - not within current month', () => {
  before(() => {
    cy.intercept('GET', '**/items*', { fixture: 'expense-array' }).as('getExpenseArray');
  });

  beforeEach(() => {
    cy.intercept('DELETE', '**/items/**', {}).as('deleteExpense');
  });

  it('selects test month', () => {
    cy.visit('/');
    cy.wait('@getExpenseArray');
    cy.findByRole('combobox', { name: /select a month/i }).select(TEST_MONTH);
  });

  it('checks if fixtures expenses are correctly rendered and sorted', () => {
    cy.get('[data-cy="expenses"] > li').should('have.length', 3).and('not.contain', 'You have no prior expenses');
    cy.get('[data-cy="expenses"] > li').last().as('oldestExpense');
    cy.get('@oldestExpense').should('contain', '01/02/2022').and('contain', 'Test Expense - Cypress - Feb 22 - Pizza').and('contain', '- €0.99');
  });

  it('deletes the oldest expense in the month', () => {
    cy.get('[data-cy="expenses"] > li').as('history');
    cy.get('@history').last().as('toBeDeleted');
    cy.get('@toBeDeleted').within(() => {
      cy.get('[data-cy="deleteButton"]').click();
    });
  });

  it('confirms deletion of the expense', () => {
    cy.get('[id="Confirm expense deletion"]').within(() => {
      cy.get('[data-cy="okButton"]').click();
    });
    cy.wait('@deleteExpense');
  });

  it('checks if expenses are correctly rendered', () => {
    cy.get('[data-cy="expenses"] > li').should('have.length', 2).should('not.contain', '01/02/2022').and('not.contain', 'Test Expense - Cypress - Feb 22 - Pizza').and('not.contain', '- €0,99');
  });

  it('closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('checks that the summary has been correctly updated', () => {
    cy.get('[data-cy="total-budget"]').should('contain', '€7,777.00');
    cy.get('[data-cy="total-expenses"]').should('contain', '€10.98');
    cy.get('[data-cy="remaining-budget"]').should('contain', '€7,766.02');
  });
});
