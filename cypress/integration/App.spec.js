import '@testing-library/cypress/add-commands';
import { getCurrentMonth, getUKFormattedEuros } from '../../src/utils/helpers';

describe('App', () => {
  it('adds expenses', () => {
    // Stub responses for getting and posting expense items
    cy.intercept('GET', '/items*', []);
    cy.intercept('POST', '/items*', {
      id: 5,
      title: 'Tasty test tacos',
      date: '2022-02-01',
      amount: 1499,
    });

    cy.visit('/');
    cy.findByRole('textbox', { name: /expense name/i }).type('Test Tacos');
    cy.findByLabelText(/expense date/i).click();
    cy.get('[data-cy="dateParent"]')
      .find('.react-datepicker')
      .should('be.visible');
    cy.findByLabelText(/expense date/i).type('2022-02-01{enter}');
    cy.findByRole('spinbutton', { name: /expense amount in €/i }).type('14.99');
    cy.findByRole('button', { name: /add/i }).click();

    cy.findByRole('combobox', { name: /select a month/i }).should(
      'contain',
      'February 2022'
    );

    cy.get('[id="Select month view"]').within(() => {
      cy.get('[data-cy="okButton"]').click();
    });

    cy.findByRole('alert').should('be.visible').wait(5000).should('not.exist');

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

    cy.get('[data-cy=expenses]')
      .should('have.length', 1)
      .and('not.contain', 'You have no prior expenses');
    cy.get('[data-cy="expenses"] > li')
      .should('contain', '01/02/2022')
      .and('contain', 'Tasty test tacos')
      .and('contain', '- €14.99');

    // Check that the summary has been updated
    cy.get('[data-cy="total-budget"]').then($el => {
      const totalBudget = $el.text().replace(/\D/g, '');
      const totalExpenses = 1499;
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

    const currentMonth = getCurrentMonth();
    cy.findByRole('combobox', { name: /select a month/i }).select(currentMonth);
    cy.get('[data-cy="expenses"]')
      .should('not.contain', '01/02/2022')
      .and('not.contain', 'Tasty test tacos')
      .and('not.contain', '- €14.99');
  });

  it('deletes expenses', () => {
    // Stub responses for getting and deleting expense items
    cy.intercept('GET', '/items*', []);
    cy.intercept('DELETE', '/items*', {
      id: 6,
      title: 'Tasty bier',
      date: '2022-05-01',
      amount: 499,
    });

    cy.visit('/');
    cy.findByRole('textbox', { name: /expense name/i }).type('Tasty bier');
    cy.findByLabelText(/expense date/i).click();
    cy.get('[data-cy="dateParent"]')
      .find('.react-datepicker')
      .should('be.visible');
    cy.findByLabelText(/expense date/i).type('2022-05-01{enter}');
    cy.findByRole('spinbutton', { name: /expense amount in €/i }).type('4.99');
    cy.findByRole('button', { name: /add/i }).click();

    cy.get('[data-cy="expenses"] > li')
      .should('contain', '01/05/2022')
      .and('contain', 'Tasty bier')
      .and('contain', '- €4.99');

    cy.get('[data-cy="expenses"] > li').within(() => {
      cy.get('[data-cy="deleteButton"]').click();
    });

    cy.get('[id="Confirm expense deletion"]').within(() => {
      cy.get('[data-cy="okButton"]').click();
    });

    cy.findByRole('alert').should('be.visible').wait(5000).should('not.exist');

    cy.get('[data-cy=expenses]')
      .should('have.length', 1)
      .and('contain', 'You have no prior expenses');
  });
});
