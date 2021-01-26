export class cartPage {
  deleteProduct(num) {
    for (let i = 0; i < num; i++) {
      cy.get("button").contains("REMOVE").click();
    }
  }

  continueShopping() {
    cy.get(".btn_secondary").contains("Continue Shopping").click();
    cy.url().should("include", "/inventory.html");
  }

  checkout() {
    cy.get(".checkout_button").contains("CHECKOUT").click();
    cy.url().should("include", "/checkout-step-one");
  }
}
export const cart = new cartPage();
