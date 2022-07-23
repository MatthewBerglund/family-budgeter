import '@testing-library/cypress/add-commands';

const EXPENSE_MONTH = 'February 2022';

describe('Alert delete expense - fail', () => {
  before(() => {
    cy.clearDatabase();
  });

  after(() => {
    cy.clearDatabase();
  });

  it('adds an initial expense', () => {
    cy.visit('/');
    cy.wait(100);
    cy.fixture('expense-array').then(expenses => {
      cy.addExpense(expenses[0]);
    });
    cy.wait(100);
  });

  it('navigates to the new expense month', () => {
    cy.get(`[id="New expense added to ${EXPENSE_MONTH}"]`).within(() => {
      cy.get('[data-cy="okButton"]').click();
    });
    cy.findByRole('combobox', { name: /select a month/i }).should(
      'have.value',
      EXPENSE_MONTH
    );
  });

  it('adds additional expenses', () => {
    cy.fixture('expense-array').then(expenses => {
      cy.addExpense(expenses[1]);
      cy.addExpense(expenses[2]);
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
    cy.wait(100);
  });

  it('checks if the alert is correctly rendered', () => {
    cy.findByRole('alert').within(() => {
      cy.get('p').should(
        'contain',
        'The expense could not be deleted. Please try again.'
      );
    });
  });

  it('checks that alert is automatically closed', () => {
    cy.findByRole('alert').should('be.visible').wait(5000).should('not.be.visible');
  });
});
