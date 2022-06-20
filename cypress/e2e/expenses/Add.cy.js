import '@testing-library/cypress/add-commands';

import { getCurrentMonth } from '../../../src/utils/helpers';

const EXPENSE_MONTH = 'March 2022';
const CURRENT_MONTH = getCurrentMonth();

describe('Add expense - not within current month', () => {
  // before(() => {
  //   cy.intercept('GET', '**/items*', []).as('getExpenses');
  // });

  // beforeEach(() => {
  //   cy.intercept('POST', '**/items*', { fixture: 'expense-post' }).as(
  //     'postExpense'
  //   );
  // });

  it('adds the expense', () => {
    cy.visit('/');
    // cy.wait('@getExpenses');
    // cy.addExpenseFromFixture('expense-raw');
    // cy.wait('@postExpense');
  });

  // it('selects expense month', () => {
  //   cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).within(() => {
  //     cy.get('[data-cy="okButton"]').click();
  //   });
  //   cy.findByRole('combobox', { name: /select a month/i }).should(
  //     'have.value',
  //     EXPENSE_MONTH
  //   );
  // });

  // it('closes the alert', () => {
  //   cy.findByRole('alert').within(() => {
  //     cy.get('[class="btn-close"]').click();
  //   });
  // });

  // it('checks that the form has been cleared', () => {
  //   cy.findByRole('textbox', { name: /expense name/i }).should(
  //     'have.value',
  //     ''
  //   );
  //   cy.findByLabelText(/expense date/i).should('have.value', '');
  //   cy.findByRole('spinbutton', { name: /expense amount/i }).should(
  //     'have.value',
  //     ''
  //   );
  // });

  // it('checks that new expense is correctly rendered', () => {
  //   cy.get('[data-cy=expenses]')
  //     .should('have.length', 1)
  //     .and('not.contain', 'You have no prior expenses');

  //   cy.fixture('expense-post').then(expense => {
  //     cy.get('[data-cy="expenses"] > li')
  //       .should('contain', '01/03/2022')
  //       .and('contain', 'Test Expense - Cypress')
  //       .and('contain', '- €4.99');
  //   });
  // });

  // it('checks that the summary has been correctly updated', () => {
  //   cy.get('[data-cy="total-budget"]').should('contain', '€7,777.00');
  //   cy.get('[data-cy="total-expenses"]').should('contain', '€4.99');
  //   cy.get('[data-cy="remaining-budget"]').should('contain', '€7,772.01');
  // });

  // it("checks that the new expense is not rendered in other month's history", () => {
  //   cy.findByRole('combobox', { name: /select a month/i }).select(
  //     CURRENT_MONTH
  //   );
  //   cy.get('[data-cy="expenses"]')
  //     .should('not.contain', '01/03/2022')
  //     .and('not.contain', 'Test Expense - Cypress')
  //     .and('not.contain', '- €4.99');
  // });
});
