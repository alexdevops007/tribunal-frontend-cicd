// tests/CourtList.test.js
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CourtList from "../src/views/CourtList.vue";

test("affiche la liste des tribunaux", () => {
  const wrapper = mount(CourtList, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            courtStore: {
              courts: [
                {
                  id: 1,
                  name: "Tribunal 1",
                  location: "Ville 1",
                  jurisdiction: "Type 1",
                  contact: "email1@example.com",
                },
                {
                  id: 2,
                  name: "Tribunal 2",
                  location: "Ville 2",
                  jurisdiction: "Type 2",
                  contact: "email2@example.com",
                },
              ],
            },
          },
        }),
      ],
    },
  });

  const courtItems = wrapper.findAll("li");
  expect(courtItems.length).toBe(2);
});
