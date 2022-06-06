import '@testing-library/cypress/add-commands';

import {
  getUKFormattedEuros,
  getUKFormattedDate,
} from '../../../src/utils/helpers';

describe('DELETE EXPENSE - NOT CURRENT MONTH', () => {
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
    const TEST_MONTH = 'February 2022';
    cy.findByRole('combobox', { name: /select a month/i }).select(TEST_MONTH);
  });

  it('checks if fixtures expenses are correctly rendered and sorted', () => {
    cy.get('[data-cy="expenses"] > li')
      .should('have.length', 3)
      .and('not.contain', 'You have no prior expenses');

    cy.get('[data-cy="expenses"] > li').last().as('oldestExpense');

    cy.fixture('expense-array').then(expenses => {
      cy.get('@oldestExpense')
        .should('contain', getUKFormattedDate(expenses[0].date))
        .and('contain', `${expenses[0].title}`)
        .and('contain', `- ${getUKFormattedEuros(expenses[0].amount)}`);
    });
  });

  it('selects oldest expense in month', () => {
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
    cy.fixture('expense-array').then(expenses => {
      cy.get('[data-cy="expenses"] > li')
        .should('have.length', 2)
        .should('not.contain', getUKFormattedDate(expenses[0].date))
        .and('not.contain', `${expenses[0].title}`)
        .and('not.contain', `- ${getUKFormattedEuros(expenses[0].amount)}`);
    });
  });

  it('it closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('checks that the summary has been correctly updated', () => {
    cy.fixture('expense-array').then(expenses => {
      cy.get('[data-cy="total-budget"]').then($el => {
        const totalBudget = $el.text().replace(/\D/g, '');
        const totalExpenses = expenses[1].amount + expenses[2].amount;
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
});
