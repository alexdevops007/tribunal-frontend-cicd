// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "/api/auth/login",
    body: { email, password },
  }).then((resp) => {
    window.localStorage.setItem("token", resp.body.token);
  });
});

Cypress.Commands.add(
  "fillCourtForm",
  (name, location, jurisdiction, contact) => {
    cy.get('input[placeholder="Nom du tribunal"]').type(name);
    cy.get('input[placeholder="Emplacement"]').type(location);
    cy.get('input[placeholder="Juridiction"]').type(jurisdiction);
    cy.get('input[placeholder="Contact"]').type(contact);
  }
);
