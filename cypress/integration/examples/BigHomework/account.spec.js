describe("account function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
    cy.get(".login").click();
    cy.get("#email").clear().type("yaowang274@gmail.com");
    cy.get("#passwd").clear().type("wangsong");
    cy.get("#SubmitLogin").click();
    cy.url().should("include", "controller=my-account");
  });

  it.only("order history and details", function () {
    cy.get("span").contains("Order history and details").click();
    cy.get("tbody>tr").should("have.length", 3);

    //////order reference
    cy.get(".first_item > .history_link").click();
    cy.get(":nth-child(2) > .footable-row-detail-cell").should("be.visible");
    cy.get(".first_item > .history_link").click();
    cy.get(":nth-child(2) > .footable-row-detail-cell").should(
      "not.be.visible"
    );
    cy.get(".first_item > .history_link > .footable-toggle").click();
    cy.get(":nth-child(2) > .footable-row-detail-cell").should("be.visible");
    cy.get(".first_item > .history_link > .footable-toggle").click();
    cy.get(":nth-child(2) > .footable-row-detail-cell").should(
      "not.be.visible"
    );
    cy.get(".first_item > .history_link > .color-myaccount").click();
    cy.get(".dark > strong").should(
      "contain",
      "Order Reference GGSIWKUJS -- placed on 02/02/2021"
    );
    cy.get(".item > .history_link > .color-myaccount").click();
    cy.get(".dark > strong").should(
      "contain",
      "Order Reference MTGMSMFNO -- placed on 02/02/2021"
    );

    //////Date
    cy.get(".footable-sorted").click();

    //////total price
    //////status
    //////invoice
    //////details
    //////message
  });
});
