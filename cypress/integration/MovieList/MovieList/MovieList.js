import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("User Visit Movie List", () => {
  cy.visit("/movies-list/s=fast");
  cy.server();
  cy.scrollTo("bottom");
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=fast&page=1",
    status: 200,
    response: "fx:SearchSuggestion/SearchSuggestionSuccess"
  }).as("searchSuggestionSuccess");
});

Then("User Saw Movie List", () => {
  cy.get("[data-cy=movies_list_frame]").should("be.visible");
  cy.get("[data-cy=movies_list_container]")
    .children()
    .should("have.length", 10);
});

When("User Scroll to Bottom", () => {
  cy.visit("/movies-list/s=fast");
  cy.server();
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=fast&page=1",
    status: 200,
    response: "fx:SearchSuggestion/SearchSuggestionSuccess"
  }).as("searchSuggestionSuccess");
  cy.scrollTo("bottom");
});

Then("Movie List Increased", () => {
  cy.get("[data-cy=movies_list_frame]").should("be.visible");
  cy.get("[data-cy=movies_list_container]")
    .children()
    .should("have.length", 20);
});

When("User Click Movie List", () => {
  cy.visit("/movies-list/s=fast");
  cy.server();
  cy.get("[data-cy=input_search]").type("fast");
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&s=fast&page=1",
    status: 200,
    response: "fx:SearchSuggestion/SearchSuggestionSuccess"
  }).as("searchSuggestionSuccess");
  cy.get("[data-cy=list_item_1]").click({ force: true });
});

Then("User Redirect to Detail", () => {
  cy.get("[data-cy=movie_detail_frame]").should("be.visible");
});
