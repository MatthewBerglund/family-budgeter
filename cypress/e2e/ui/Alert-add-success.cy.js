import '@testing-library/cypress/add-commands';

const EXPENSE_MONTH = 'March 2022';

describe('Alert add expense - success', () => {
  before(() => {
    cy.clearDatabase();
  });

  after(() => {
    cy.clearDatabase();
  });

  it('adds the expense', () => {
    cy.visit('/');
    cy.addExpenseFromFixture('expense-raw');
    cy.wait(100);
  });

  it('selects expense month', () => {
    cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).within(() => {
      cy.get('[data-cy="okButton"]').click();
    });
    cy.findByRole('combobox', { name: /select a month/i }).should(
      'have.value',
      EXPENSE_MONTH
    );
  });

  it('checks that alert is automatically closed', () => {
    cy.findByRole('alert').should('be.visible').wait(5000).should('not.be.visible');
  });
});
