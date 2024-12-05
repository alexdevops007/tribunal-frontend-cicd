// tests/CreateCourt.test.js
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import CreateCourt from "../src/views/CreateCourt.vue";
import CourtList from "../src/views/CourtList.vue";

const routes = [
  { path: "/", component: CourtList },
  { path: "/create", component: CreateCourt },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

test("ajoute un tribunal et redirige vers la liste", async () => {
  const wrapper = mount(CreateCourt, {
    global: {
      plugins: [createPinia(), router],
    },
  });

  // Mettez à jour les sélecteurs pour correspondre aux attributs placeholder
  await wrapper
    .find('input[placeholder="Nom du tribunal"]')
    .setValue("Nouveau Tribunal");
  await wrapper
    .find('input[placeholder="Emplacement"]')
    .setValue("Nouvelle Ville");
  await wrapper
    .find('input[placeholder="Juridiction"]')
    .setValue("Nouvelle Juridiction");
  await wrapper
    .find('input[placeholder="Contact"]')
    .setValue("+243999937726");

  await wrapper.find("form").trigger("submit.prevent");

  expect(wrapper.vm.$router.currentRoute.value.path).toBe("/");
});
