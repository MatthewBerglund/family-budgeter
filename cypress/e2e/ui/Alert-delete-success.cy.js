import '@testing-library/cypress/add-commands';

import { getUKFormattedDate } from '../../../src/utils/helpers';

describe('ALERT DELETE EXPENSE - SUCCESS', () => {
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
  });

  it('checks if the alert is correctly rendered', () => {
    cy.fixture('expense-array').then(expenses => {
      cy.findByRole('alert').within(() => {
        cy.get('p').should('contain', getUKFormattedDate(expenses[0].date));
      });
    });
  });

  it('checks that alert is automatically closed', () => {
    cy.findByRole('alert').should('be.visible').wait(5000).should('not.exist');
  });
});
