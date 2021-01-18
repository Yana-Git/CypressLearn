describe("Test4", function () {
  beforeEach(() => {
    cy.visit("https://demoqa.com/automation-practice-form");
    cy.fixture("profile.json").as("profile");
  });
  it("read data", function () {
    let firstName = this.profile.firstName;
    let lastName = this.profile.lastName;
    let Email = this.profile.Email;
    let Gender = this.profile.Gender;
    let Mobile = this.profile.Mobile;
    let State = this.profile.State;
    let City = this.profile.City;
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
      .should("contain", firstName)
      .and("contain", lastName);
    cy.get("tbody>tr").eq(1).should("contain", Email);
    cy.get("tbody>tr").eq(2).should("contain", Gender);
    cy.get("tbody>tr").eq(3).should("contain", Mobile);
    cy.get("tbody>tr").eq(9).should("contain", State).and("contain", City);
    cy.get("#closeLargeModal").click();
    cy.get(".modal-content").should("not.exist");
  });
});
