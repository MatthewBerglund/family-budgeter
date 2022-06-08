import '@testing-library/cypress/add-commands';

import expenseArray from '../../fixtures/expense-array.json';
import {
  getUKFormattedEuros,
  getUKFormattedDate,
} from '../../../src/utils/helpers';

const TEST_MONTH = 'February 2022';

describe('Delete expense - not within current month', () => {
  before(() => {
    cy.intercept('GET', '**/items*', { fixture: 'expense-array' }).as(
      'getExpenseArray'
    );
    cy.visit('/');
    cy.wait('@getExpenseArray');
  });

  beforeEach(() => {
    cy.intercept('DELETE', '**/items/**', {}).as('deleteExpense');
  });

  it('selects test month', () => {
    cy.findByRole('combobox', { name: /select a month/i }).select(TEST_MONTH);
  });

  it('checks if fixtures expenses are correctly rendered and sorted', () => {
    cy.get('[data-cy="expenses"] > li')
      .should('have.length', 3)
      .and('not.contain', 'You have no prior expenses');

    cy.get('[data-cy="expenses"] > li').last().as('oldestExpense');

    cy.get('@oldestExpense')
      .should('contain', getUKFormattedDate(expenseArray[0].date))
      .and('contain', `${expenseArray[0].title}`)
      .and('contain', `- ${getUKFormattedEuros(expenseArray[0].amount)}`);
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
    cy.get('[data-cy="expenses"] > li')
      .should('have.length', 2)
      .should('not.contain', getUKFormattedDate(expenseArray[0].date))
      .and('not.contain', `${expenseArray[0].title}`)
      .and('not.contain', `- ${getUKFormattedEuros(expenseArray[0].amount)}`);
  });

  it('closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('checks that the summary has been correctly updated', () => {
    cy.get('[data-cy="total-budget"]').then($el => {
      const totalBudget = $el.text().replace(/\D/g, '');
      const totalExpenses = expenseArray[1].amount + expenseArray[2].amount;
      const remainingBudget = totalBudget - totalExpenses;

      cy.get('[data-cy="total-expenses"]').should(
        'contain',
        getUKFormattedEuros(totalExpenses)
      );
      cy.get('[data-cy="remaining-budget"]').should(
        'contain',
        getUKFormattedEuros(remainingBudget)
      );
    });
  });
});
