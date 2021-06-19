import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("User Visit Movie Detail", () => {
  cy.visit("/movie-detail/&i=tt6806448");
  cy.server();
  cy.route({
    method: "GET",
    url: "**/?apikey=faf7e5bb&i=tt6806448",
    status: 200,
    response: "fx:MovieDetail/MovieDetailSuccess"
  }).as("movieDetailSuccess");
});

Then("User Will Saw Movie Detail", () => {
  cy.get("[data-cy=movie_detail_frame]").should("be.visible");
  cy.get("[data-cy=detail_poster]")
    .children("img")
    .should("be.visible");
});
