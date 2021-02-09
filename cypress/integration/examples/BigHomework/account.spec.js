const path = require("path");
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
    cy.get("tbody>tr").should("have.length", 4);

    //////order reference

    cy.get(".first_item > .history_link > .color-myaccount").click();
    cy.get(".dark > strong").should(
      "contain",
      "Order Reference FTZCOVFRM -- placed on 02/03/2021"
    );
    cy.get(".item.alternate_item > .history_link > .color-myaccount").click();
    cy.get(".dark > strong").should(
      "contain",
      "Order Reference GGSIWKUJS -- placed on 02/02/2021"
    );

    //////message
    cy.get("#sendOrderMessage > .submit > .button > span").click();
    cy.get(".alert > p").contains("There is 1 error");
    cy.get("select").select("6");
    cy.get(":nth-child(4) > .form-control").clear().type("lala");
    cy.get("#sendOrderMessage > .submit > .button > span").click();
    cy.get(".alert-success").contains(" Message successfully sent");
    //////Date
    cy.get("tbody").find("tr").eq(4).contains("02/02/2021");
    cy.get("tbody").find("tr").eq(0).contains("02/03/2021");
    cy.get("#order-list > thead > tr > :nth-child(2)").click();
    cy.get("tbody").find("tr").eq(0).contains("02/02/2021");
    cy.get("tbody").find("tr").eq(3).contains("02/03/2021");

    //////total price
    cy.get('#order-list > thead > tr > [data-hide="phone"]').click();
    cy.get("tbody").find("tr").eq(3).contains("55");
    cy.get("tbody").find("tr").eq(0).contains("18.51");
    cy.get('#order-list > thead > tr > [data-hide="phone"]').click();
    cy.get("tbody").find("tr").eq(0).contains("55");
    cy.get("tbody").find("tr").eq(3).contains("18.51");

    //////status
    cy.get(":nth-child(1) > .history_state").contains("On backorder");

    //////invoice方法一成功

    const downloadsFolder = "cypress/downloads";
    const validatePDFFile = () => {
      const downloadedFilename = path.join(downloadsFolder, "IN054845.pdf");

      cy.readFile(downloadedFilename).should((pdf) => {
        expect(pdf).include("pdf");
      });
    };
    cy.get(":nth-child(1) > .history_invoice > .link-button").click();
    validatePDFFile();
    ////方法二失败expected undefined to equal 200
    // cy.get(":nth-child(1) > .history_link > .footable-toggle").click();
    // cy.intercept(
    //   "get",
    //   "http://automationpractice.com/index.php?controller=pdf-invoice&id_order=282854"
    // ).as("PdfFile");
    // cy.get(
    //   ":nth-child(2) > .footable-row-detail-cell > .footable-row-detail-inner > :nth-child(2) > .footable-row-detail-value > .link-button"
    // ).click();
    // cy.wait("@PdfFile").should((response) => {
    //   expect(response.status).equal(200);
    // });

    //////details

    cy.get(":nth-child(1) > .history_detail > .btn > span").click();
    cy.get(".dark > strong").should(
      "contain",
      "Order Reference MTGMSMFNO -- placed on 02/02/2021"
    );
  });
});
