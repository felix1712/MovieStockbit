import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("User Visit Home", () => {
  cy.visit("/");
  cy.server();
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=you&y=2021&page=1",
    status: 200,
    response: "fx:NewRelease/NewReleaseSuccess"
  }).as("newReleaseMovies");
});

Then("User Will See Landing Page", () => {
  expect(cy.get("[data-cy=landing-page]").should("exist"));
  expect(cy.get("[data-cy=new_release_frame]").should("be.visible"));
  expect(
    cy
      .get("[data-cy=new_release_container]")
      .children()
      .should("have.length", 10)
  );
});

When("User Try Search", () => {
  cy.visit("/");
  cy.server();
  cy.get("[data-cy=input_search]").type("fast");
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=fast&page=1",
    status: 200,
    response: "fx:SearchSuggestion/SearchSuggestionSuccess"
  }).as("searchSuggestionSuccess");
});

Then("User Will Saw Suggestion", () => {
  cy.get("[data-cy=search_suggestion_container]")
    .children()
    .should("have.length", 5);
});

When("User Click Search", () => {
  cy.visit("/");
  cy.server();
  cy.get("[data-cy=input_search]").type("fast");
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=fast&page=1",
    status: 200,
    response: "fx:SearchSuggestion/SearchSuggestionSuccess"
  }).as("searchSuggestionSuccess");
  cy.get("[data-cy=suggestion_item_1]").click({ force: true });
});

Then("User Redirect to Detail", () => {
  cy.get("[data-cy=movie_detail_frame]").should("be.visible");
});
