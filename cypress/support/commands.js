// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-iframe";
Cypress.Commands.add("addToCart", (number) => {
  for (let i = 2; i < number + 2; i++) {
    cy.get("button").eq(i).click();
  }
  cy.get("#shopping_cart_container").should("contain", number);
});
Cypress.Commands.add("clearCart", () => {
  cy.get("#shopping_cart_container").then(($el) => {
    const qty = $el.text();
    for (let i = 0; i < qty; i++) {
      cy.get("button").contains("REMOVE").click();
    }
    cy.get(".cart_item").should("not.exist");
  });
});
