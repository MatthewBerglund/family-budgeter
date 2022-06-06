import '@testing-library/cypress/add-commands';

import {
  getUKFormattedEuros,
  getUKFormattedDate,
  getCurrentMonth,
} from '../../../src/utils/helpers';

describe('ADD EXPENSE - NOT CURRENT MONTH', () => {
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

  it('selects expense month', () => {
    cy.fixture('expense-raw').then(expense => {
      const expenseMonth = getUKFormattedDate(expense.date, {
        year: 'numeric',
        month: 'long',
      });
      cy.get(`[id="New expense added to ${expenseMonth}"]`).within(() => {
        cy.get('[data-cy="okButton"]').click();
      });
      cy.findByRole('combobox', { name: /select a month/i }).should(
        'have.value',
        expenseMonth
      );
    });
  });

  it('it closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('checks that the form has been cleared', () => {
    cy.findByRole('textbox', { name: /expense name/i }).should(
      'have.value',
      ''
    );
    cy.findByLabelText(/expense date/i).should('have.value', '');
    cy.findByRole('spinbutton', { name: /expense amount/i }).should(
      'have.value',
      ''
    );
  });

  it('checks that new expense is correctly rendered', () => {
    cy.get('[data-cy=expenses]')
      .should('have.length', 1)
      .and('not.contain', 'You have no prior expenses');

    cy.fixture('expense-post').then(expense => {
      cy.get('[data-cy="expenses"] > li')
        .should('contain', getUKFormattedDate(expense.date))
        .and('contain', `${expense.title}`)
        .and('contain', `- ${getUKFormattedEuros(expense.amount)}`);
    });
  });

  it('checks that the summary has been correctly updated', () => {
    cy.fixture('expense-post').then(expense => {
      cy.get('[data-cy="total-budget"]').then($el => {
        const totalBudget = $el.text().replace(/\D/g, '');
        const totalExpenses = expense.amount;
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

  it('checks that current month is not updated', () => {
    const currentMonth = getCurrentMonth();
    cy.fixture('expense-post').then(expense => {
      cy.findByRole('combobox', { name: /select a month/i }).select(
        currentMonth
      );
      cy.get('[data-cy="expenses"]')
        .should('not.contain', getUKFormattedDate(expense.date))
        .and('not.contain', `${expense.title}`)
        .and('not.contain', `- ${getUKFormattedEuros(expense.amount)}`);
    });
  });
});
