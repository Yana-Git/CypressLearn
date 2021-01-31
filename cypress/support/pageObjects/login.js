export class LoginPage {
  visit() {
    cy.visit("https://www.saucedemo.com");
  }

  loginInfo(username, password) {
    //cy.get("#user-name").clear().type(`${username}{enter}`);
    cy.get("[data-test='username']").then(($input) => {
      $input.val(username);
    });
    cy.get("[data-test='password']").then(($input) => {
      $input.val(password);
    });
    cy.get("#login-button").click();
    // cy.get("#password").clear().type(`${password}{enter}`);
    //cy.get("body").should("contain", "Products");
  }
}

export const login = new LoginPage();
