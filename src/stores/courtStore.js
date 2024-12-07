// src/stores/courtStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCourtStore = defineStore("courtStore", () => {
  const courts = ref([
    {
      id: "1",
      name: "Cour Suprême de la RDC",
      location: "Kinshasa",
      jurisdiction: "National",
      contact: "+243 820 000 001",
    },
    {
      id: "2",
      name: "Cour Constitutionnelle",
      location: "Kinshasa",
      jurisdiction: "Constitutionnelle",
      contact: "+243 820 000 002",
    },
    {
      id: "3",
      name: "Cour de Cassation",
      location: "Kinshasa",
      jurisdiction: "Cassation",
      contact: "+243 820 000 003",
    },
    {
      id: "4",
      name: "Conseil d'État",
      location: "Kinshasa",
      jurisdiction: "Administrative",
      contact: "+243 820 000 004",
    },
    {
      id: "5",
      name: "Cour d'Appel de Lubumbashi",
      location: "Lubumbashi",
      jurisdiction: "Appel",
      contact: "+243 820 000 005",
    },
    {
      id: "6",
      name: "Tribunal de Grande Instance de Goma",
      location: "Goma",
      jurisdiction: "Civile",
      contact: "+243 820 000 006",
    },
    {
      id: "7",
      name: "Tribunal de Paix de Matadi",
      location: "Matadi",
      jurisdiction: "Paix",
      contact: "+243 820 000 007",
    },
    {
      id: "8",
      name: "Tribunal de Commerce de Kinshasa",
      location: "Kinshasa",
      jurisdiction: "Commerce",
      contact: "+243 820 000 008",
    },
    {
      id: "9",
      name: "Cour Militaire de Bukavu",
      location: "Bukavu",
      jurisdiction: "Militaire",
      contact: "+243 820 000 009",
    },
    {
      id: "10",
      name: "Tribunal pour Enfants de Mbuji-Mayi",
      location: "Mbuji-Mayi",
      jurisdiction: "Enfance",
      contact: "+243 820 000 010",
    },
  ]);

  const searchTerm = ref(""); // Terme de recherche

  // Filtrer les tribunaux
  const filteredCourts = computed(() => {
    if (!searchTerm.value.trim()) {
      return courts.value; // Si la recherche est vide, retourner tous les tribunaux
    }
    const term = searchTerm.value.toLowerCase();
    return courts.value.filter(
      (court) =>
        court.name.toLowerCase().includes(term) ||
        court.location.toLowerCase().includes(term) ||
        court.jurisdiction.toLowerCase().includes(term)
    );
  });

  const addCourt = (court) => {
    court.id = courts.value.length + 1;
    courts.value.push(court);
  };

  const getCourtById = (id) => {
    return courts.value.find((court) => court.id === Number(id));
  };

  const deleteCourt = (id) => {
    courts.value = courts.value.filter((court) => court.id !== id);
  };

  const editCourt = (id, updatedCourt) => {
    const index = courts.value.findIndex((court) => court.id === id);
    if (index !== -1) {
      courts.value[index] = { ...courts.value[index], ...updatedCourt };
    }
  };


  return {
    courts,
    searchTerm,
    filteredCourts,
    addCourt,
    getCourtById,
    editCourt,
    deleteCourt,
  };
});
