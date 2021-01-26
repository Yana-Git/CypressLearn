import { cart } from "../../support/pageObjects/cart";
import { login } from "../../support/pageObjects/login";
import { prodList } from "../../support/pageObjects/prodList";
describe("Test8", function () {
  beforeEach(() => {
    login.visit();
    login.loginInfo("standard_user", "secret_sauce");
  });
  it("addToCart", function () {
    prodList.addProduct(2);
    prodList.goCart();
    cart.deleteProduct(1);
    cart.continueShopping();
    prodList.addProduct(1);
    prodList.goCart();
    cart.checkout();
  });
});
