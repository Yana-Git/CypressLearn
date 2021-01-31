describe("Test8", function () {
  before(function () {
    cy.fixture("article.json").as("article");
  });
  //////////////////////////////////////////////////////Test 1
  //payload 不会
  //tagList为空？？
  it("test case 1", function () {
    cy.visit("https://demo.realworld.io/#/");
    cy.get('[show-authed="false"] > :nth-child(2) > .nav-link').click();

    cy.get(":nth-child(2) > .form-control")
      .clear()
      .type("yaowang274@gmail.com");
    cy.get(":nth-child(3) > .form-control").clear().type("wangsong");
    cy.get(".btn").click();
    cy.visit("https://demo.realworld.io/#/editor/");
    cy.get('[show-authed="true"] > :nth-child(2) > .nav-link').click();
    cy.get(":nth-child(1) > .form-control").clear().type("lalala");
    cy.get(":nth-child(2) > .form-control").clear().type("hahaha");
    cy.get(":nth-child(3) > .form-control").clear().type("test");
    cy.get(":nth-child(4) > .form-control").clear().type("cypress");

    cy.intercept("POST", "https://conduit.productionready.io/api/articles").as(
      "articles"
    );
    cy.get(".btn").click();
    cy.wait("@articles").should(({ request }) => {
      expect(request.headers)
        .to.have.property("content-type")
        .contains("application/json");
      expect(request.Payload).includes({
        title: "lalala",
        description: "hahaha",
        body: "test",
      });
      // expect(request.payload.article.title).equal("lalala");
      // expect(request.payload.article.description).equal("hahaha");
      // expect(request.payload.article.body).equal("test");
      //expect(request.payload.article.tagList).equal("cypress");
    });
  });

  //////////////////////////////////////////////////////////////Test 2

  it.only("test case 2", function () {
    cy.intercept(
      "get",
      "https://conduit.productionready.io/api/articles?author=yana96&limit=5&offset=0",
      { fixture: "stub.json" }
    ).as("visitPage");
    cy.visit("https://demo.realworld.io/#/@yana96");
    cy.wait("@visitPage");
  });

  /////////////////////////////////////////////////////////Test 3

  it("test case 3", function () {
    const image = this.article.articles[1].author.image;
    cy.log(image);
    cy.intercept(
      "get",
      "https://conduit.productionready.io/api/articles?author=yana96&limit=5&offset=0",
      { fixture: "article.json" }
    ).as("visitPage");
    cy.visit("https://demo.realworld.io/#/@yana96");
    cy.wait("@visitPage").should(({ response }) => {
      expect(response.body.articles[0]).to.have.property("title", "lalala");
      expect(response.body.articles[0].author).to.have.property(
        "username",
        "yana96"
      );
      expect(response.body.articles[0]).to.have.property("body", "test");
      expect(response.body.articles[0]).to.have.property(
        "description",
        "hahaha"
      );
      expect(response.body.articles[0]).to.have.property("favorited", false);
      expect(response.body.articles[0].author).to.have.property(
        "image",
        "https://static.productionready.io/images/smiley-cyrus.jpg"
      );
      expect(response.body.articles[0]).to.have.property(
        "slug",
        "lalala-7tiig8"
      );
      expect(response.body.articles[0]).to.have.property(
        "createdAt",
        "2021-01-30T11:33:53.798Z"
      );
      expect(response.body.articles[0]).to.have.property("favoritesCount", 0);
      expect(response.body.articles[0]).to.have.property(
        "updatedAt",
        "2021-01-30T11:33:53.798Z"
      );

      for (let i = 0; i < 10; i++) {
        cy.get(".article-preview").eq(i).should("be.visible");
        cy.get(".article-preview")
          .eq(i)
          .find("img")
          .invoke("attr", "src")
          .then(function (firstSrc) {
            expect(firstSrc).to.equal(image);
          });
      }
    });
  });
});
