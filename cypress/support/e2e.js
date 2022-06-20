// addExpenseFromFixture is a reusable command to add ONE expense
// the command expects a fixture containing ONE expense object
// pass the name of the fixture file as string
//
// Usage example:
// cy.addExpenseFromFixture('expense-raw')

Cypress.Commands.add('addExpenseFromFixture', fixture => {
  cy.fixture(fixture).then(expense => {
    cy.findByRole('textbox', { name: /expense name/i }).type(
      `${expense.title}`
    );
    cy.findByLabelText(/expense date/i).type(`${expense.date}{enter}`);
    cy.findByRole('spinbutton', { name: /expense amount/i }).type(
      `${expense.amount}`
    );
    cy.findByRole('button', { name: /add/i }).click();
  });
});

// Flushes the Cloud Firestore emulator database
Cypress.Commands.add('clearDB', async () => {
  const url = 'http://localhost:8080/emulator/v1/projects/family-budgeter-1/databases/(default)/documents';
  try {
    await fetch(url, { method: 'DELETE' });
  } catch (err) {
    console.log('Database could not be flushed: ' + err);
  }
});
