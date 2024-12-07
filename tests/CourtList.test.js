import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CourtList from "../src/views/CourtList.vue";
import { vi } from "vitest"; // Importez `vi` pour les mocks

describe("CourtList.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CourtList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              courtStore: {
                courts: [
                  {
                    id: "1",
                    name: "Tribunal 1",
                    location: "Ville 1",
                    jurisdiction: "Type 1",
                    contact: "email1@example.com",
                  },
                  {
                    id: "2",
                    name: "Tribunal 2",
                    location: "Ville 2",
                    jurisdiction: "Type 2",
                    contact: "email2@example.com",
                  },
                ],
              },
            },
            stubActions: false,
          }),
        ],
        stubs: {
          // Remplacez les `router-link` pour éviter les erreurs de résolution
          "router-link": true,
        },
      },
    });
  });

  test("affiche la liste des tribunaux", () => {
    const courtItems = wrapper.findAll("li");
    expect(courtItems.length).toBe(2); // Deux tribunaux sont affichés
    expect(wrapper.text()).toContain("Tribunal 1");
    expect(wrapper.text()).toContain("Tribunal 2");
  });

  test("filtre les tribunaux par recherche", async () => {
    const searchInput = wrapper.find(
      "input[placeholder='Rechercher un tribunal...']"
    );
    await searchInput.setValue("Tribunal 1"); // Simule une recherche par "Tribunal 1"

    const courtItems = wrapper.findAll("li");
    expect(courtItems.length).toBe(1); // Un seul tribunal doit être affiché
    expect(wrapper.text()).toContain("Tribunal 1");
    expect(wrapper.text()).not.toContain("Tribunal 2");
  });

  test("supprime un tribunal correctement", async () => {
    // Simule `window.confirm` avec Vitest
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    let courtItems = wrapper.findAll("li");
    expect(courtItems.length).toBe(2); // Vérifiez qu'il y a 2 tribunaux initialement

    const deleteButton = wrapper.find("button.text-red-500");
    await deleteButton.trigger("click"); // Simule un clic sur le bouton "Supprimer"

    courtItems = wrapper.findAll("li");
    expect(courtItems.length).toBe(1); // Vérifiez qu'un tribunal a été supprimé
    expect(wrapper.text()).not.toContain("Tribunal 1");
    expect(wrapper.text()).toContain("Tribunal 2");

    // Nettoyez le mock
    vi.restoreAllMocks();
  });
});
