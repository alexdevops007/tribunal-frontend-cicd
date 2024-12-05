import { mount } from "@vue/test-utils";
import CourtList from "@/views/CourtList.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCourtStore } from "@/store/courtStore";
import { mockCourts } from "@/mocks/mockData";
import CourtCard from "@/components/courts/CourtCard.vue";

describe("CourtList.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("affiche la liste des tribunaux", async () => {
    const courtStore = useCourtStore();
    courtStore.fetchCourts = jest.fn(() => {
      courtStore.courts = mockCourts;
      courtStore.loading = false;
    });

    const wrapper = mount(CourtList);

    await wrapper.vm.$nextTick();

    expect(courtStore.fetchCourts).toHaveBeenCalled();
    expect(wrapper.findAllComponents(CourtCard).length).toBe(mockCourts.length);
  });
});
