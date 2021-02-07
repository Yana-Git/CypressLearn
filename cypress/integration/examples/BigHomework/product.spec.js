describe("product function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
  });

  it.only("successful search", function () {
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .quick-view-wrapper-mobile > .quick-view-mobile"
    ).click();
    // .trigger("mouseover")
    // .find("a")
    // .contains("Quick view")
    // .click({ force: true });
    //cy.get("#bigpic").should("be.visible");
    cy.get(".fancybox-item").click();
    // cy.get("span").contains("Quick view").should("be.visible");
    // cy.get(".product-price").contains("$16.51").should("be.visible");
    cy.get("span").contains("Add to cart").should("be.visible").click();
    cy.get(".layer_cart_product > h2").should(
      "contain",
      "Product successfully added to your shopping cart"
    );
    cy.get(".continue > span").click();
    cy.url().should("include", "http://automationpractice.com/index.php");
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .right-block > .button-container > .lnk_view > span"
    ).click();
    cy.url().should("include", "controller=product");
  });
});
