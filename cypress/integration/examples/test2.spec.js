describe("Test2", function () {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });
  it("emptyLogin", function () {
    cy.get("#user-name").clear();
    cy.get("#password").clear();
    cy.get("#login-button").click();
    cy.get("h3").should("contain", "Username is required");
    cy.get("#user-name").clear().type("123");
    cy.get("#login-button").click();
    cy.get("h3").should("contain", "Password is required");
    cy.get("button").should("be.visible");
    cy.get("button").click();
    cy.get("button").should("not.exist");
  });
  it("failLogin", function () {
    cy.get("#user-name").clear().type("standar_user");
    cy.get("#password").clear().type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("h3").should(
      "contain",
      "Username and password do not match any user in this service"
    );
    cy.get("button").should("be.visible");
    cy.get("button").click();
    cy.get("button").should("not.exist");
  });
  it("successLogin", function () {
    cy.get("#user-name").clear().type("standard_user");
    cy.get("#password").clear().type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("body").should("contain", "Products");
    //cy.get(".inventory_item").its("length").should("be.gt", 4);
    cy.get(".inventory_item").should("have.length", 6);
  });
});
