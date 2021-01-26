export class prodListPage {
  addProduct(num) {
    for (let i = 2; i < num + 2; i++) {
      cy.get("button").eq(i).click();
    }
  }

  goCart() {
    cy.get("#shopping_cart_container").click();
    cy.url().should("include", "/cart.html");
  }
}

export const prodList = new prodListPage();
