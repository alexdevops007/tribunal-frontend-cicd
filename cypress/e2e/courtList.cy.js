describe("Gestion des Tribunaux - Liste", () => {
  it("Affiche la liste des tribunaux", () => {
    cy.visit("/");
    cy.contains("Liste des Tribunaux");
    cy.get("li").should("have.length", 10); // Vérifie qu'il y a 10 tribunaux
  });

  it("Peut naviguer vers les détails d'un tribunal", () => {
    cy.visit("/");
    cy.get("li").first().contains("Détails").click();
    cy.url().should("include", "/court/1");
    cy.contains("Emplacement :");
    cy.contains("Juridiction :");
  });

  it("Peut supprimer un tribunal", () => {
    cy.visit("/");
    cy.get("li").should("have.length", 10);
    cy.get("li").first().contains("Supprimer").click();
    cy.get("li").should("have.length", 9);
  });
});
