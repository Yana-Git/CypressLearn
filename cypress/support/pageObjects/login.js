export class LoginPage {
  visit() {
    cy.visit("https://www.saucedemo.com");
  }

  loginInfo(username, password) {
    cy.get("#user-name", { log: false })
      .clear()
      .type(`${username}{enter}`, { log: false });
    cy.get("#password", { log: false })
      .clear()
      .type(`${password}{enter}`, { log: false });
    cy.get("body").should("contain", "Products");
  }
}

export const login = new LoginPage();
