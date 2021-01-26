describe("Test7", function () {
  it("conditionalTest", function () {
    cy.visit(
      "https://www.calculator.net/random-number-generator.html?slower=1&supper=100&ctype=1&s=6516&submit1=Generate"
    );
    cy.get(".verybigtext").then(($num) => {
      const num = $num.text();
      cy.log(num);
      if (num < 50) {
        cy.log("the value is less than 50");
      } else {
        cy.log("the value is greater than 49");
      }
    });
  });
});
