import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CourtForm from "../src/components/courts/CourtForm.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("CourtForm.vue", () => {
  let mockRouterPush;
  let mockAddCourt;
  let mockEditCourt;

  beforeEach(() => {
    // Mock du router
    mockRouterPush = vi.fn();

    // Mock des actions Pinia
    mockAddCourt = vi.fn();
    mockEditCourt = vi.fn();
  });

  it("affiche le formulaire en mode création", () => {
    const wrapper = mount(CourtForm, {
      global: {
        plugins: [
          createTestingPinia({
            actions: {
              addCourt: mockAddCourt,
            },
          }),
        ],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    expect(wrapper.find("button").text()).toBe("Créer");
  });

  it("affiche le formulaire en mode édition", () => {
    const wrapper = mount(CourtForm, {
      props: {
        courtData: {
          _id: "1",
          name: "Tribunal de Commerce",
          location: "Lubumbashi",
          jurisdiction: "Commerce",
          contact: "+243999999999",
        },
      },
      global: {
        plugins: [
          createTestingPinia({
            actions: {
              editCourt: mockEditCourt,
            },
          }),
        ],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    expect(wrapper.find("button").text()).toBe("Mettre à jour");
  });

//   it("soumet les données pour créer un tribunal", async () => {
//     const wrapper = mount(CourtForm, {
//       global: {
//         plugins: [
//           createTestingPinia({
//             actions: {
//               addCourt: mockAddCourt,
//             },
//           }),
//         ],
//         mocks: {
//           $router: {
//             push: mockRouterPush,
//           },
//         },
//       },
//     });

//     // Remplir le formulaire
//     await wrapper
//       .find('input[placeholder="Nom du tribunal"]')
//       .setValue("Tribunal de Commerce");
//     await wrapper
//       .find('input[placeholder="Localisation"]')
//       .setValue("Lubumbashi");
//     await wrapper.find('input[placeholder="Compétence"]').setValue("Commerce");
//     await wrapper
//       .find('input[placeholder="Contact"]')
//       .setValue("+243999999999");

//     // Soumettre le formulaire
//     await wrapper.find("form").trigger("submit.prevent");

//     expect(mockAddCourt).toHaveBeenCalledWith({
//       name: "Tribunal de Commerce",
//       location: "Lubumbashi",
//       jurisdiction: "Commerce",
//       contact: "+243999999999",
//     });

//     expect(mockRouterPush).toHaveBeenCalledWith("/courts");
//   });

//   it("soumet les données pour modifier un tribunal", async () => {
//     const wrapper = mount(CourtForm, {
//       props: {
//         courtData: {
//           _id: "1",
//           name: "Tribunal de Commerce",
//           location: "Lubumbashi",
//           jurisdiction: "Commerce",
//           contact: "+243999999999",
//         },
//       },
//       global: {
//         plugins: [
//           createTestingPinia({
//             actions: {
//               editCourt: mockEditCourt,
//             },
//           }),
//         ],
//         mocks: {
//           $router: {
//             push: mockRouterPush,
//           },
//         },
//       },
//     });

//     // Modifier le nom du tribunal
//     await wrapper
//       .find('input[placeholder="Nom du tribunal"]')
//       .setValue("Tribunal de Grande Instance");

//     // Soumettre le formulaire
//     await wrapper.find("form").trigger("submit.prevent");

//     expect(mockEditCourt).toHaveBeenCalledWith("1", {
//       name: "Tribunal de Grande Instance",
//       location: "Lubumbashi",
//       jurisdiction: "Commerce",
//       contact: "+243999999999",
//     });

//     expect(mockRouterPush).toHaveBeenCalledWith("/courts");
//   });
});
