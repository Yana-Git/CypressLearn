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

  it("problemLogin", function () {
    cy.get("#user-name").clear().type("locked_out_user");
    cy.get("#password").clear().type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("h3").should("contain", "Sorry, this user has been locked out");
    cy.get("#user-name").clear().type("problem_user");
    cy.get("#password").clear().type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("#item_4_img_link")
      .find('[src="./img/sauce-backpack-1200x1500.jpg"]', { timeout: 10000 })
      .should("not.exist");
    cy.get(".inventory_item_img").first().should("be.visible");
    cy.get("#user-name").clear().type("performance_glitch_user");
    cy.get("#password").clear().type("secret_sauce");
    cy.get("#login-button").click();
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

  it.only("successLogin", function () {
    cy.xpath('//input[@id="user-name"]').clear().type("standard_user");
    cy.xpath('//input[@id="password"]').clear().type("secret_sauce");
    cy.xpath('//input[@id="login-button"]').click();
    cy.get("body").should("contain", "Products");
    cy.get(".inventory_item").should("have.length", 6);
    // cy.get(".shopping_cart_link.fa-layers.fa-fw").then(($el) => {
    //   if (
    //     $el.find("fa-layers-conter.shopping_cart_badge").contents("1").length
    //   ) {
    //     cy.get("#shopping_cart_container").click();
    //     cy.get("button").contains("REMOVE").click();
    //     cy.get(".btn_secondary").contains("Continue Shopping").click();
    //   }
    // });
    // cy.get(".inventory_item_name").contains("Sauce Labs Backpack").click();
    // cy.url().should("include", "/inventory-item.html?id=4");
    // cy.get("button").contains("ADD TO CART").click();
    // cy.get("#shopping_cart_container").should("contain", "1").click();
    // cy.url().should("include", "/cart.html");
    // cy.get(".cart_quantity").should("contain", "1");
    // cy.get("button").contains("REMOVE").click();
    // cy.get(".cart_item").should("not.exist");
    // cy.get(".btn_secondary").contains("Continue Shopping").click();
    // cy.url().should("include", "/inventory.html");
    // cy.get("button").contains("ADD TO CART").first().click();
    // cy.get("button").contains("ADD TO CART").last().click();
    // cy.get("#shopping_cart_container").should("contain", "2").click();
    // cy.url().should("include", "/cart.html");
    // cy.get(".cart_item").should("have.length", 2);
    // cy.get(".checkout_button").contains("CHECKOUT").click();
    // cy.url().should("include", "/checkout-step-one");
    // cy.get(".cart_cancel_link.btn_secondary").contains("CANCEL").click();
    // cy.url().should("include", "/cart.html");
    // cy.get(".checkout_button").contains("CHECKOUT").click();
    // cy.get("#first-name").clear().type("123");
    // cy.get("#last-name").clear().type("123");
    // cy.get("#postal-code").clear().type("123");
    // cy.get(".btn_primary.cart_button").contains("CONTINUE").click();
    // cy.url().should("include", "/checkout-step-two");
    // cy.get(".btn_action.cart_button").contains("FINISH").click();
    // cy.url().should("include", "/checkout-complete");
    // cy.get("body").should("contain", "THANK YOU FOR YOUR ORDER");
    cy.addToCart(5);
    cy.get("#shopping_cart_container").click();
    cy.clearCart();
  });
});
