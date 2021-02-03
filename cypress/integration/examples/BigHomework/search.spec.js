describe("search function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("successful search", function () {
    cy.get("#search_query_top").clear().type("dress");
    cy.get("#searchbox > .btn").click();
    cy.get(".heading-counter").should("contain", "results have been found");
  });

  it("empty search", function () {
    cy.get("#search_query_top").clear();
    cy.get("#searchbox > .btn").click();
    cy.get(".alert-warning").should("contain", "Please enter a search keyword");
  });

  it.only("no result search", function () {
    cy.get("#search_query_top").clear().type("pants");
    cy.get("#searchbox > .btn").click();
    cy.get(".alert-warning").should(
      "contain",
      "No results were found for your search"
    );
  });
});
