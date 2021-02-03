describe("product function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
  });

  it.only("successful search", function () {
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container"
    )

      .find("span")
      .contains("Quick view")
      .invoke("show", { force: true })
      .click();
    cy.get("span").contains("Quick view").should("be.visible");
    cy.get(".product-price").contains("$16.51").should("be.visible");
    cy.get("span").contains("Add to cart").should("be.visible");
    cy.get("span").contains("More").should("be.visible");
  });
});
