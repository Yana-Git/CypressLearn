//<reference types="cypress-iframe" />

describe("product function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
    // cy.get(".login").click();
    // cy.get("#email").clear().type("yaowang274@gmail.com");
    // cy.get("#passwd").clear().type("wangsong");
    // cy.get("#SubmitLogin").click();
    // cy.url().should("include", "controller=my-account");
    // cy.get(".icon-home").click();
  });
  const frame = document.getElementById('your-frame-id');
  frame.contentWindow.postMessage(/*any variable or object here*/, 'http://your-second-site.com');
  it("mouseover", function () {
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    ).rightclick();
    cy.iframe().find("span").contains("Add to cart").click();

    ///add to cart

    // getIframeBody()
    //   .find("span")
    //   .contains("Add to cart")
    //   .should("be.visible")
    //   .click();
    cy.get("h2")
      .contains("Product successfully added to your shopping cart")
      .should("be.visible");
    cy.get(".cross").click();
    ///more
    // cy.get(
    //   "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    // ).rightclick();
    // getIframeBody().find("span").contains("More").should("be.visible").click();
    // cy.url().should("include", "id_product=1&controller=product");
    // cy.get(".icon-home").click();
    ///quick view pic
    // cy.get(
    //   "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    // ).rightclick();
    // getIframeBody().find("span").contains("Quick view").click();
    // getIframeBody().find("#bigpic").should("be.visible");
    // getIframeBody().find("#thumb_4").trigger("mouseover");
    // getIframeBody()
    //   .find("#bigpic")
    //   .find('[src="http://automationpractice.com/img/p/4/4-cart_default.jpg"]')
    //   .should("exist");
    ///share
    // cy.visit(
    //   "https://twitter.com/intent/tweet?text=Faded%20Short%20Sleeve%20T-shirts%20http://automationpractice.com/index.php?id_product=1&controller=product",
    //   {
    //     onBeforeLoad(win) {
    //       cy.stub(win, "open");
    //     },
    //   }
    // );
    // getIframeBody().find("button").contains("Tweet").click();
    // cy.window().its("open").should("be.called");

    ///wishlist
    // getIframeBody().find("p").contains("Add to wishlist").click();
    // cy.get("p").contains("Added to your wishlist.").should("exist");
    // cy.get("a").find('[title="Close"]').click();
    ///add to cart
    // getIframeBody().find(".icon-plus").click();
    // getIframeBody().find("select").select("3");
    // getIframeBody().find("a").find('[title="Blue"]').click();
    // getIframeBody().find("span").contains("Add to cart").click();
    // cy.get("h2")
    //   .contains("Product successfully added to your shopping cart")
    //   .should("be.visible");
    // cy.get("span").contains("Blue, L").should("exist");
    // cy.get("#layer_cart_product_quantity").should("contain", "2");
  });
});
