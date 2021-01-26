describe("Hooks", () => {
  before(function () {
    cy.visit("http://a.testaddressbook.com/sign_in");
    cy.get("#session_email").clear().type("yaowang274@gmail.com");
    cy.get("#session_password").clear().type("wangsong");
    cy.get("input").contains("Sign in").click();
    cy.get("h1").should("contain", "Welcome to Address Book");
    cy.fixture("profile.json").as("profile");
  });

  beforeEach(() => {});

  it("addAddress", function () {
    cy.get("a").contains("Addresses").click();
    cy.url().should("include", "addresses");
    cy.get(".row.justify-content-center").click();
    cy.url().should("include", "/new");
    const firstName = this.profile.firstName;
    const lastName = this.profile.lastName;
    const address = this.profile.streetAddress;
    const City = this.profile.City;
    const zipCode = this.profile.zipCode;
    cy.get("#address_first_name")
      .clear()
      .type(firstName)
      .should("have.value", firstName);
    cy.get("#address_last_name")
      .clear()
      .type(lastName)
      .should("have.value", lastName);
    cy.get("#address_street_address")
      .clear()
      .type(address)
      .should("have.value", address);
    cy.get("#address_city").clear().type(City).should("have.value", City);
    cy.get("#address_zip_code")
      .clear()
      .type(zipCode)
      .should("have.value", zipCode);
    cy.get("input").contains("Create Address").click();
    cy.get(".alert-notice").should(
      "contain",
      "Address was successfully created."
    );
  });

  afterEach(function () {
    cy.fixture("profile.json").as("profile");
    const firstName = this.profile.firstName;
    //     cy.get('@profile').then((profile)=>{
    //       const firstName = this.profile.firstName;
    // })
    cy.get(".nav-item.nav-link").contains("Addresses").click();
    cy.get(".table")
      .find("tbody>tr")
      .contains(firstName)
      .closest("tr")
      .find("td")
      .find("a")
      .contains("Destroy")
      .click();
    cy.get(".alert-notice").should(
      "contain",
      "Address was successfully destroyed."
    );
  });

  after(() => {
    cy.get("a").contains("Sign out").click();
    cy.get("h2").should("contain", "Sign in");
  });
});
