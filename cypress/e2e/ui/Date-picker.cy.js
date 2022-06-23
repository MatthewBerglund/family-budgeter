/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

describe('Date picker', () => {
  before(() => {
    cy.clearDatabase();
  });

  after(() => {
    cy.clearDatabase();
  });

  it('checks that the date picker is rendered', () => {
    cy.visit('/');
    cy.fixture('expense-raw').then(expense => {
      cy.findByLabelText(/expense date/i).as('date').click();
      cy.get('[data-cy="dateParent"]')
        .find('.react-datepicker')
        .should('be.visible');
      cy.get('@date').type(`${expense.date}{enter}`).then($dateEl => {
        expect($dateEl.val()).to.equal('01/03/2022');
      });;
    });
  });
});
