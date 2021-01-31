describe("Test6", function () {
  before(function () {
    cy.request({
      url: "https://reqres.in/api/users/2",
      body: {
        id: "2",
      },
    }).then((response) => {
      if (response.status == 200) {
        cy.request({
          method: "DELETE",
          url: "https://reqres.in/api/users/2",
        }).then((response) => {
          expect(response.status).equal(204);
        });
      } else {
        cy.log("id 2 not exist");
      }
    });
    // cy.visit("https://docket-test.herokuapp.com/");
    // cy.get("a").contains("Login").click();
    // cy.get("#username").clear().type("yana");
    // cy.get("#password").clear().type("wangsong");
    // cy.get("#submit").click();
    // cy.get(".list-group").then(function ($ul) {
    //   let num = $ul.find(".list-group-item").length;
    //   if (num > 0) {
    //     cy.get(".list-group-item").each(($li) => {
    //       cy.get($li).find("button").click();
    //     });
    //   } else {
    //     cy.log("empty");
    //   }
    // });
  });
  it("addUser", function () {
    const newUser = {
      name: "yana",
      job: "tester",
    };

    cy.intercept("POST", "https://reqres.in/api/users").as("users");

    cy.request({
      method: "post",
      url: "https://reqres.in/api/users",
      newUser,
    });

    cy.wait("@users").should((response) => {
      expect(response.status).equal(201);
      expect(response.body.name).equal(newUser.name);
      const newId = response.body.id;
      cy.log(newId);

      cy.request({
        url: `https://reqres.in/api/users/${newId}`,
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.data.name).equal("yana");
        expect(response.body.data.job).equal("tester");
      });
    });

    cy.request({
      method: "patch",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      console.log(response);
    });
  });
  after(function () {});
});
