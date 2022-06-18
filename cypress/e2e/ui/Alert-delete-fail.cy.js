import '@testing-library/cypress/add-commands';

const TEST_MONTH = 'February 2022';

describe('Alert delete expense - fail', () => {
  before(() => {
    cy.intercept('GET', '**/items*', { fixture: 'expense-array' }).as(
      'getExpenseArray'
    );
    cy.visit('/');
    cy.wait('@getExpenseArray');
  });

  beforeEach(() => {
    cy.intercept('DELETE', '**/items/**', {
      statusCode: 500,
    }).as('deleteExpenseFail');
  });

  it('selects test month', () => {
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
    cy.wait('@deleteExpenseFail');
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
    cy.findByRole('alert').should('be.visible').wait(5000).should('not.exist');
  });
});
