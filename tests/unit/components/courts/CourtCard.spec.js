import { shallowMount } from "@vue/test-utils";
import CourtCard from "@/components/courts/CourtCard.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCourtStore } from "@/store/courtStore";

describe("CourtCard.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("affiche les informations du tribunal correctement", () => {
    const court = {
      _id: "1",
      name: "Cour Suprême",
      location: "Kinshasa",
      jurisdiction: "National",
      contact: "+243 820 000 001",
    };
    const wrapper = shallowMount(CourtCard, {
      props: { court },
    });
    expect(wrapper.text()).toContain("Cour Suprême");
    expect(wrapper.text()).toContain("Kinshasa");
    expect(wrapper.text()).toContain("National");
    expect(wrapper.text()).toContain("+243 820 000 001");
  });

  it("appelle la méthode de suppression lors du clic sur le bouton supprimer", async () => {
    const court = {
      _id: "1",
      name: "Cour Suprême",
      location: "Kinshasa",
      jurisdiction: "National",
      contact: "+243 820 000 001",
    };
    window.confirm = jest.fn(() => true); // Simule l'acceptation de la confirmation
    const courtStore = useCourtStore();
    courtStore.removeCourt = jest.fn();

    const wrapper = shallowMount(CourtCard, {
      props: { court },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(window.confirm).toHaveBeenCalledWith(
      "Êtes-vous sûr de vouloir supprimer ce tribunal ?"
    );
    expect(courtStore.removeCourt).toHaveBeenCalledWith("1");
  });
});
