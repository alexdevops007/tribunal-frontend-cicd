import { setActivePinia, createPinia } from "pinia";
import { useCourtStore } from "@/store/courtStore";
import { mockCourts } from "@/mocks/mockData";

describe("courtStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetchCourts remplit le tableau des tribunaux", () => {
    const courtStore = useCourtStore();
    courtStore.fetchCourts();
    expect(courtStore.courts.length).toBe(mockCourts.length);
  });

  it("fetchCourt remplit l’objet court", () => {
    const courtStore = useCourtStore();
    courtStore.fetchCourt("1");
    expect(courtStore.court._id).toBe("1");
  });

  it("addCourt ajoute un nouveau tribunal", () => {
    const courtStore = useCourtStore();
    const initialLength = courtStore.courts.length;
    courtStore.addCourt({
      name: "Nouveau Tribunal",
      location: "Nouvelle Ville",
      jurisdiction: "Nouvelle Compétence",
      contact: "Nouveau Contact",
    });
    expect(courtStore.courts.length).toBe(initialLength + 1);
  });

  it("editCourt modifie un tribunal existant", () => {
    const courtStore = useCourtStore();
    courtStore.fetchCourts();
    const updatedData = {
      name: "Tribunal Modifié",
      location: "Ville Modifiée",
      jurisdiction: "Compétence Modifiée",
      contact: "Contact Modifié",
    };
    courtStore.editCourt("1", updatedData);
    const updatedCourt = courtStore.courts.find((c) => c._id === "1");
    expect(updatedCourt.name).toBe("Tribunal Modifié");
  });

  it("removeCourt supprime un tribunal", () => {
    const courtStore = useCourtStore();
    courtStore.fetchCourts();
    const initialLength = courtStore.courts.length;
    courtStore.removeCourt("1");
    expect(courtStore.courts.length).toBe(initialLength - 1);
  });
});
