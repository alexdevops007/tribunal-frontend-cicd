describe("Gestion des Tribunaux - Liste, Recherche et Suppression", () => {
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

  it("filtre les tribunaux par recherche", () => {
    cy.visit("/");

    cy.get("input[placeholder='Rechercher un tribunal...']").type("Kinshasa");
    cy.get("li").should("have.length", 5); // 5 tribunaux à Kinshasa

    cy.get("input[placeholder='Rechercher un tribunal...']")
      .clear()
      .type("National");
    cy.get("li").should("have.length", 1); // 1 tribunal avec "National"
  });

  it("supprime un tribunal", () => {
    cy.visit("/");

    cy.get("li").should("have.length", 10); // Total initial
    cy.contains("Supprimer").click(); // Supprime le premier tribunal

    cy.get("li").should("have.length", 9); // 1 tribunal supprimé
  });
});
