import '@testing-library/cypress/add-commands';

const EXPENSE_MONTH = 'March 2022';

describe('Modal confirm month selection', () => {
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

  it('checks that the modal is correctly rendered', () => {
    cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).should('be.visible');
  });
});
