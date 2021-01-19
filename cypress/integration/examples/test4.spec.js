describe("Test4", function () {
  beforeEach(() => {
    cy.visit("https://demoqa.com/automation-practice-form");
    cy.fixture("profile.json").as("profile");
  });
  it("readData", function () {
    const firstName = this.profile.firstName;
    const lastName = this.profile.lastName;
    const Email = this.profile.Email;
    const Gender = this.profile.Gender;
    const Mobile = this.profile.Mobile;
    const State = this.profile.State;
    const City = this.profile.City;
    cy.get("#firstName")
      .clear()
      .type(firstName)
      .should("have.value", firstName);
    cy.get("#lastName").clear().type(lastName).should("have.value", lastName);
    cy.get("#userEmail").clear().type(Email).should("have.value", Email);
    cy.get("#genterWrapper").find("label").contains(Gender).click();
    cy.get("#userNumber").clear().type(Mobile).should("have.value", Mobile);
    cy.get("#state").click();
    cy.get(".css-26l3qy-menu")
      .should("be.visible")
      .find("div")
      .contains(State)
      .click();
    cy.get("#city").click();
    cy.get(".css-26l3qy-menu")
      .should("be.visible")
      .find("div")
      .contains(City)
      .click();
    cy.get("#submit").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("tbody>tr")
      .eq(0)
      .should("contain", firstName + " " + lastName);
    cy.get("tbody>tr").eq(1).should("contain", Email);
    cy.get("tbody>tr").eq(2).should("contain", Gender);
    cy.get("tbody>tr").eq(3).should("contain", Mobile);
    cy.get("tbody>tr")
      .eq(9)
      .should("contain", State + " " + City);
    cy.get("#closeLargeModal").click();
    cy.get(".modal-content").should("not.exist");
  });
});
