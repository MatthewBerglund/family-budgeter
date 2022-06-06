/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

describe('DATE PICKER', () => {
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

  it('checks that the date picker is rendered', () => {
    cy.fixture('expense-raw').then(expense => {
      cy.findByLabelText(/expense date/i).click();
      cy.get('[data-cy="dateParent"]')
        .find('.react-datepicker')
        .should('be.visible');
      cy.findByLabelText(/expense date/i).type(`${expense.date}{enter}`);
    });
  });
});
