import '@testing-library/cypress/add-commands';

const EXPENSE_MONTH = 'March 2022';
const UPDATED_MONTH = 'December 1999';

describe('Edit an expense', () => {
  before(() => {
    cy.clearDatabase();
  });

  after(() => {
    cy.clearDatabase();
  })

  it('opens the application', () => {
    cy.visit('/');
    cy.wait(100);
  });

  it('adds an expense', () => {
    cy.addExpenseFromFixture('expense-raw');
    cy.wait(100);
  });

  it('navigates to the new expense month', () => {
    cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).within(() => {
      cy.get('[data-cy="okButton"]').click();
    });
  });

  it('closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('edits the expense', () => {
    cy.findByRole('button', { name: /edit/i }).click();
    cy.fixture('expense-display').then(expense => {
      const title = new RegExp(expense.title, 'i');
      const date = new RegExp(expense.date, 'i');
      const amount = new RegExp(expense.amount, 'i');

      cy.findByDisplayValue(title).type(' Edited');
      cy.findByDisplayValue(date).clear().type('1999-12-31{enter}');
      cy.findByDisplayValue(amount).clear().type('9999');
      cy.findByRole('button', { name: /save/i }).click();
      cy.wait(100);
    });
  });

  it('closes the alert', () => {
    cy.findByRole('alert').within(() => {
      cy.get('[class="btn-close"]').click();
    });
  });

  it('navigates to the updated expense month', () => {
    cy.findByRole('combobox', { name: /select a month/i }).select(UPDATED_MONTH);
  });

  it('checks that updated expense is correctly rendered', () => {
    cy.get('[data-cy=expenses]')
      .should('have.length', 1)
      .and('not.contain', 'You have no prior expenses');

    cy.get('[data-cy="expenses"] > li')
      .should('contain', '31/12/1999')
      .and('contain', 'Test Expense - Cypress Edited')
      .and('contain', '- €9,999.00');
  });
});