// cypress/e2e/createCourt.spec.js

describe("Gestion des Tribunaux - Création", () => {
  it("Peut ajouter un nouveau tribunal", () => {
    cy.visit("/");
    cy.contains("Ajouter un Tribunal").click();
    cy.url().should("include", "/create");

    cy.get('input[placeholder="Nom du tribunal"]').type("Tribunal Test");
    cy.get('input[placeholder="Emplacement"]').type("Ville Test");
    cy.get('input[placeholder="Juridiction"]').type("Test Juridiction");
    cy.get('input[placeholder="Contact"]').type("+243000000000");

    cy.contains("Enregistrer").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.contains("Tribunal Test");
  });
});
