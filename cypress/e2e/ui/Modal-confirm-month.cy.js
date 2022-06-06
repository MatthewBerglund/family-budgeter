import '@testing-library/cypress/add-commands';

import { getUKFormattedDate } from '../../../src/utils/helpers';

describe('MODAL CONFIRM MONTH SELECTION', () => {
  before(() => {
    cy.intercept('GET', '**/items*', []).as('getExpenses');
    cy.visit('/');
    cy.wait('@getExpenses');
  });

  beforeEach(() => {
    cy.intercept('POST', '**/items*', { fixture: 'expense-post' }).as(
      'postExpense'
    );
  });

  it('adds the expense', () => {
    cy.addExpenseFromFixture('expense-raw');
    cy.wait('@postExpense');
  });

  it('checks that the modal is correctly rendered', () => {
    cy.fixture('expense-raw').then(expense => {
      const expenseMonth = getUKFormattedDate(expense.date, {
        year: 'numeric',
        month: 'long',
      });

      cy.get(`[id="New expense added to ${expenseMonth}"]`).should(
        'be.visible'
      );
    });
  });
});
