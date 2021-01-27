describe("Test6", function () {
  before(function () {
    cy.visit("https://docket-test.herokuapp.com/");
    cy.get("a").contains("Login").click();
    cy.get("#username").clear().type("yana");
    cy.get("#password").clear().type("wangsong");
    cy.get("#submit").click();
    cy.get(".list-group").then(function ($ul) {
      let num = $ul.find(".list-group-item").length;
      if (num > 0) {
        cy.get(".list-group-item").each(($li) => {
          cy.get($li).find("button").click();
        });
      } else {
        cy.log("empty");
      }
    });
  });
  it("addTodo", function () {
    cy.request({
      method: "POST",
      url: "https://docket-test.herokuapp.com/api/Todo/",
      headers: {
        token: "908784af-4dc3-4f2e-884f-cb12b12daa6e",
      },
      body: {
        Body: "Walk cat",
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });

    cy.request({
      method: "POST",
      url: "https://docket-test.herokuapp.com/api/Todo/",
      headers: {
        token: "908784af-4dc3-4f2e-884f-cb12b12daa6e",
      },
      body: {
        Body: "Walk dog",
      },
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.length(6);
    });

    // cy.get("#todoInput").clear().type("walk dog");
    // cy.get("button").contains("Add todo").click();
    // cy.get(".list-group-item").should("have.length", 1);
    // cy.get("#todoItem").should("contain", "walk dog");
    // cy.get("#todoInput").clear().type("go shopping");
    // cy.get("button").contains("Add todo").click();
    // cy.get(".list-group-item").should("have.length", 2);
    // cy.get(".list-group-item").eq(0).should("contain", "go shopping");
    // cy.get(".list-group-item").eq(1).should("contain", "walk dog");
  });
  after(function () {
    cy.request({
      method: "DELETE",
      url: "https://docket-test.herokuapp.com/api/Todo/2",
      headers: {
        token: "908784af-4dc3-4f2e-884f-cb12b12daa6e",
      },
      body: {
        Body: "Walk dog",
      },
    })
      .its("status")
      .should("be.ok");
    // cy.get(".list-group")
    //   .find(".list-group-item")
    //   .find("#todoItem")
    //   .contains("go shopping")
    //   .closest("li")
    //   .find("button")
    //   .find("#delete")
    //   .click();
    // cy.get(".list-group")
    //   .find(".list-group-item")
    //   .find("#todoItem")
    //   .contains("walk dog")
    //   .closest("li")
    //   .find("button")
    //   .find("#delete")
    //   .click();
  });
});