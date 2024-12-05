import { shallowMount } from "@vue/test-utils";
import CourtForm from "@/components/courts/CourtForm.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCourtStore } from "@/store/courtStore";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

describe("CourtForm.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it("appelle la méthode addCourt lors de la soumission du formulaire en mode création", async () => {
    const courtStore = useCourtStore();
    courtStore.addCourt = jest.fn();
    const router = useRouter();

    const wrapper = shallowMount(CourtForm);

    await wrapper.find('input[name="name"]').setValue("Nouveau Tribunal");
    await wrapper.find('input[name="location"]').setValue("Ville");
    await wrapper.find('input[name="jurisdiction"]').setValue("Compétence");
    await wrapper.find('input[name="contact"]').setValue("Contact");

    await wrapper.find("form").trigger("submit.prevent");

    expect(courtStore.addCourt).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/courts");
  });

  it("appelle la méthode editCourt lors de la soumission du formulaire en mode édition", async () => {
    const courtStore = useCourtStore();
    courtStore.editCourt = jest.fn();
    const router = useRouter();

    const courtData = {
      _id: "1",
      name: "Cour Suprême",
      location: "Kinshasa",
      jurisdiction: "National",
      contact: "+243 820 000 001",
    };

    const wrapper = shallowMount(CourtForm, {
      props: { courtData },
    });

    await wrapper.find("form").trigger("submit.prevent");

    expect(courtStore.editCourt).toHaveBeenCalledWith("1", courtData);
    expect(router.push).toHaveBeenCalledWith("/courts");
  });
});
