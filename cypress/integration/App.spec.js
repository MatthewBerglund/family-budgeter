import '@testing-library/cypress/add-commands';
import { getCurrentMonth } from '../../src/utils/helpers';

describe('App', () => {
  it('adds expenses', () => {
    // ARRANGE
    // Stub responses for getting and posting expense items
    cy.intercept('GET', '/items*', []);
    cy.intercept('POST', '/items*', {
      id: 5,
      title: 'Tasty test tacos',
      date: '2022-02-01',
      amount: 1499,
    });

    // ACT
    // Visit website
    cy.visit('/');

    // Type an expense name, date, amount, and click "Add"
    cy.findByRole('textbox', { name: /expense name/i }).type('Test Tacos');
    cy.findByLabelText(/expense date/i).type('2022-02-01');
    cy.findByRole('spinbutton', { name: /expense amount in €/i }).type('14.99');
    cy.findByRole('button', { name: /add/i }).click();

    // Close "Expense added" alert
    cy.findByRole('alert').within(() => {
      cy.findByRole('button').click();
    });

    // Select February 2022
    cy.findByRole('combobox', { name: /select a month/i }).select(
      'February 2022'
    );

    // ASSERT
    // Check that the form inputs have been cleared
    cy.findByRole('textbox', { name: /expense name/i }).should(
      'have.value',
      ''
    );
    cy.findByLabelText(/expense date/i).should('have.value', '');
    cy.findByRole('spinbutton', { name: /expense amount in €/i }).should(
      'have.value',
      ''
    );

    // Check that the expense has been added to the history
    cy.get('[data-cy=expenses]')
      .should('have.length', 1)
      .and('not.contain', 'You have no prior expenses');

    cy.get('[data-cy="expenses"] > li')
      .should('contain', '01/02/2022')
      .and('contain', 'Tasty test tacos')
      .and('contain', '- €14.99');

    // Check that the summary has been updated
    cy.get('[data-cy="total-budget"]').should('contain', '€7,777.00');
    cy.get('[data-cy="total-expenses"]').should('contain', '€14.99');
    cy.get('[data-cy="remaining-budget"]').should('contain', '€7,762.01');

    // Check that the expense was not added to current month
    const currentMonth = getCurrentMonth();
    cy.findByRole('combobox', { name: /select a month/i }).select(currentMonth);
    cy.get('[data-cy="expenses"]')
      .should('not.contain', '01/02/2022')
      .and('not.contain', 'Tasty test tacos')
      .and('not.contain', '- €14.99');
  });
});
