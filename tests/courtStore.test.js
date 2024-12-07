// tests/courtStore.test.js
import { setActivePinia, createPinia } from "pinia";
import { useCourtStore } from "../src/stores/courtStore";

describe("CourtStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("filtre correctement les tribunaux par nom", () => {
    const courtStore = useCourtStore();

    // Simule une recherche par "Cour"
    courtStore.searchTerm = "Cour";
    const filtered = courtStore.filteredCourts;

    // Vérifie que les tribunaux avec "Cour" dans le nom sont correctement filtrés
    expect(filtered).toHaveLength(5); // Ajustez ce nombre selon vos données
    expect(filtered.map((c) => c.name)).toEqual(
      expect.arrayContaining([
        "Cour Suprême de la RDC",
        "Cour Constitutionnelle",
        "Cour de Cassation",
      ])
    );
  });

  it("filtre correctement les tribunaux par emplacement", () => {
    const courtStore = useCourtStore();

    // Simule une recherche par "Kinshasa"
    courtStore.searchTerm = "Kinshasa";
    const filtered = courtStore.filteredCourts;

    expect(filtered).toHaveLength(5); // Vérifiez que tous les tribunaux de "Kinshasa" sont affichés
  });

  it("supprime un tribunal par ID", () => {
    const courtStore = useCourtStore();

    courtStore.deleteCourt("1");
    expect(courtStore.courts).toHaveLength(9); // Vérifiez que le tribunal est supprimé
    expect(courtStore.courts.map((c) => c.id)).not.toContain("1");
  });
});
