describe("Gestion des Tribunaux", () => {
  it("Affiche la liste des tribunaux", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Liste des Tribunaux");
    cy.get(".court-card").should("have.length", 10); // Supposons qu'il y a 10 tribunaux mockés
  });

  it("Crée un nouveau tribunal", () => {
    cy.visit("http://localhost:5173/courts/create");
    cy.get('input[name="name"]').type("Tribunal de Test");
    cy.get('input[name="location"]').type("Ville de Test");
    cy.get('input[name="jurisdiction"]').type("Compétence de Test");
    cy.get('input[name="contact"]').type("+243 000 000 000");
    cy.get("form").submit();
    cy.url().should("include", "/courts");
    cy.contains("Tribunal de Test");
  });

  it("Modifie un tribunal existant", () => {
    cy.visit("http://localhost:5173/courts");
    cy.get(".court-card")
      .first()
      .within(() => {
        cy.contains("Modifier").click();
      });
    cy.url().should("include", "/courts/edit");
    cy.get('input[name="name"]').clear().type("Tribunal Modifié");
    cy.get("form").submit();
    cy.url().should("include", "/courts");
    cy.contains("Tribunal Modifié");
  });

  it("Supprime un tribunal", () => {
    cy.visit("http://localhost:5173/courts");
    cy.get(".court-card")
      .first()
      .within(() => {
        cy.contains("Supprimer").click();
      });
    cy.on("window:confirm", () => true);
    cy.get(".court-card").should("have.length.lessThan", 10);
  });
});
