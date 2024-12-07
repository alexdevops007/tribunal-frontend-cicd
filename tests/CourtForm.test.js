import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CourtForm from "../src/components/courts/CourtForm.vue";
import { useCourtStore } from "../src/stores/courtStore";
import { createRouter, createWebHistory } from "vue-router";
import { vi } from "vitest";

// Configuration du routeur
const routes = [{ path: "/", component: { template: "<div>Home</div>" } }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("CourtForm.vue", () => {
  let courtStore;

  beforeEach(() => {
    // Créer une instance de Pinia avec des actions stubées
    const pinia = createTestingPinia({
      stubActions: false, // Actions doivent être simulées manuellement
    });
    courtStore = useCourtStore(pinia);

    // Stubber les actions du store
    courtStore.addCourt = vi.fn();
    courtStore.editCourt = vi.fn();
  });

  it("remplit les champs lors de l'édition", async () => {
    const courtData = {
      id: "1",
      name: "Tribunal Test",
      location: "Ville Test",
      jurisdiction: "Compétence Test",
      contact: "+243000000001",
    };

    const wrapper = mount(CourtForm, {
      global: {
        plugins: [router],
        mocks: {
          $router: router,
        },
      },
      props: {
        courtData,
      },
    });

    expect(
      wrapper.find('input[placeholder="Nom du tribunal"]').element.value
    ).toBe(courtData.name);
    expect(
      wrapper.find('input[placeholder="Localisation"]').element.value
    ).toBe(courtData.location);
    expect(wrapper.find('input[placeholder="Compétence"]').element.value).toBe(
      courtData.jurisdiction
    );
    expect(wrapper.find('input[placeholder="Contact"]').element.value).toBe(
      courtData.contact
    );
  });

  it("appelle addCourt pour créer un tribunal", async () => {
    const wrapper = mount(CourtForm, {
      global: {
        plugins: [router],
      },
    });

    const formData = {
      name: "Tribunal Nouveau",
      location: "Ville Nouvelle",
      jurisdiction: "Nouvelle Compétence",
      contact: "+243000000002",
    };

    await wrapper
      .find('input[placeholder="Nom du tribunal"]')
      .setValue(formData.name);
    await wrapper
      .find('input[placeholder="Localisation"]')
      .setValue(formData.location);
    await wrapper
      .find('input[placeholder="Compétence"]')
      .setValue(formData.jurisdiction);
    await wrapper
      .find('input[placeholder="Contact"]')
      .setValue(formData.contact);

    await wrapper.find("form").trigger("submit.prevent");

    // Vérifiez que la méthode addCourt a été appelée
    expect(courtStore.addCourt).toHaveBeenCalled();
    expect(courtStore.addCourt).toHaveBeenCalledWith(formData);
  });

  it("appelle editCourt pour mettre à jour un tribunal", async () => {
    const courtData = {
      id: "1",
      name: "Tribunal Test",
      location: "Ville Test",
      jurisdiction: "Compétence Test",
      contact: "+243000000001",
    };

    const wrapper = mount(CourtForm, {
      global: {
        plugins: [router],
      },
      props: {
        courtData,
      },
    });

    const updatedData = {
      ...courtData,
      name: "Tribunal Modifié",
      location: "Ville Modifiée",
    };

    await wrapper
      .find('input[placeholder="Nom du tribunal"]')
      .setValue(updatedData.name);
    await wrapper
      .find('input[placeholder="Localisation"]')
      .setValue(updatedData.location);
    await wrapper.find("form").trigger("submit.prevent");

    // Vérifiez que la méthode editCourt a été appelée
    expect(courtStore.editCourt).toHaveBeenCalled();
    expect(courtStore.editCourt).toHaveBeenCalledWith(
      courtData.id,
      updatedData
    );
  });
});
