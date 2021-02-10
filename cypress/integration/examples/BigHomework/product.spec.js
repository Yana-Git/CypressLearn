describe("product function", function () {
  beforeEach("go to the website", function () {
    cy.visit("http://automationpractice.com/index.php");
    cy.get(".login").click();
    cy.get("#email").clear().type("yaowang274@gmail.com");
    cy.get("#passwd").clear().type("wangsong");
    cy.get("#SubmitLogin").click();
    cy.url().should("include", "controller=my-account");
    cy.get(".icon-home").click();
  });
  const getIframeDocument = () => {
    return (
      cy
        .get(".fancybox-inner")
        .find("iframe")
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its("0.contentDocument")
        .should("exist")
    );
  };
  const getIframeBody = () => {
    // get the document
    return (
      getIframeDocument()
        // automatically retries until body is loaded
        .its("body")
        .should("not.be.undefined")
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };
  it("mouseover", function () {
    ///add to cart
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    ).rightclick();
    cy.get("span").contains("Add to cart").click();
    cy.get("h2")
      .contains("Product successfully added to your shopping cart")
      .should("be.visible");
    cy.get(".cross").click();
    ///more
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    ).rightclick();
    cy.get("span").contains("More").should("be.visible").click();
    cy.url().should("include", "id_product=1&controller=product");
    cy.get(".icon-home").click();
    ///quick view pic
    cy.get(
      "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x"
    ).rightclick();
    cy.get("span").contains("Quick view").click();
    cy.wait(6000);
    getIframeBody().find("#bigpic").should("be.visible");
    getIframeBody().find("#thumb_4").trigger("mouseover");
    getIframeBody()
      .find(
        'img[src="http://automationpractice.com/img/p/4/4-large_default.jpg"]'
      )
      .should("exist");
    ///share
    // cy.intercept(
    //   "GET",
    //   "https://accounts.google.com/signin/v2/identifier?passive=1209600&osid=1&continue=https%3A%2F%2Fplus.google.com%2Fup%2F%3Fcontinue%3Dhttps%3A%2F%2Fplus.google.com%2Fshare%3Furl%253Dhttp%3A%2F%2Fautomationpractice.com%2Findex.php%3Fid_product%25253D1%252526controller%25253Dproduct%252526content_only%25253D1&followup=https%3A%2F%2Fplus.google.com%2Fup%2F%3Fcontinue%3Dhttps%3A%2F%2Fplus.google.com%2Fshare%3Furl%253Dhttp%3A%2F%2Fautomationpractice.com%2Findex.php%3Fid_product%25253D1%252526controller%25253Dproduct%252526content_only%25253D1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    // ).as("share");
    getIframeBody().find("button").contains("Google+").click();
    // cy.wait("@share").should((request) => {
    //   expect(request.status).equal(200);
    // });

    ///wishlist
    getIframeBody().find("p").contains("Add to wishlist").click();
    getIframeBody()
      .find(".fancybox-error")
      .should("contain", "Added to your wishlist.");

    getIframeBody().find('a[title="Close"]').click();
    ///add to cart
    getIframeBody().find(".icon-plus").click();
    getIframeBody().find("select").select("3");
    getIframeBody().find('a[title="Blue"]').click();
    getIframeBody().find("span").contains("Add to cart").click();
    cy.get("h2")
      .contains("Product successfully added to your shopping cart")
      .should("be.visible");
    cy.get("span").contains("Blue, L").should("exist");
    cy.get("#layer_cart_product_quantity").should("contain", "2");
  });
});
