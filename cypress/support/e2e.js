// addExpenseFromFixture is a reusable command to add ONE expense
// the command expects a fixture containing ONE expense object
// pass the name of the fixture file as string
//
// Usage example:
// cy.addExpenseFromFixture('expense-raw')

Cypress.Commands.add('addExpenseFromFixture', fixture => {
  cy.fixture(fixture).then(expense => {
    cy.findByRole('textbox', { name: /expense name/i }).type(`${expense.title}`);
    cy.findByLabelText(/expense date/i).type(`${expense.date}{enter}`);
    cy.findByRole('spinbutton', { name: /expense amount/i }).type(`${expense.amount}`);
    cy.findByRole('button', { name: /add/i }).click();
  });
});
