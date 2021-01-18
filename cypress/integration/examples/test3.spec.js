describe("Test3", function () {
  it("waitButton", function () {
    cy.visit("");
    //cy.wait(5000);
    cy.get("#colorChange.mt-4.text-danger.btn.btn-primary").should(
      "be.visible"
    );
  });
});
