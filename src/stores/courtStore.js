// src/stores/courtStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCourtStore = defineStore("courtStore", () => {
  const courts = ref([
    // 10 données mock
    {
      id: 1,
      name: "Tribunal de Grande Instance de Kinshasa",
      location: "Kinshasa",
      jurisdiction: "Civil",
      contact: "contact1@example.com",
    },
    // ... ajoutez 9 autres tribunaux
  ]);

  const addCourt = (court) => {
    court.id = courts.value.length + 1;
    courts.value.push(court);
  };

  const getCourtById = (id) => {
    return courts.value.find((court) => court.id === Number(id));
  };

  const updateCourt = (updatedCourt) => {
    const index = courts.value.findIndex(
      (court) => court.id === updatedCourt.id
    );
    if (index !== -1) {
      courts.value[index] = updatedCourt;
    }
  };

  const deleteCourt = (id) => {
    courts.value = courts.value.filter((court) => court.id !== id);
  };

  return {
    courts,
    addCourt,
    getCourtById,
    updateCourt,
    deleteCourt,
  };
});
