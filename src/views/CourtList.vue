<!-- src/views/CourtList.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Liste des Tribunaux</h1>
    <router-link to="/create" class="bg-blue-500 text-white px-4 py-2 rounded">
      Ajouter un Tribunal
    </router-link>

    <!-- Champ de recherche -->
    <input
      v-model="courtStore.searchTerm"
      type="text"
      placeholder="Rechercher un tribunal..."
      class="mt-4 block w-full border-gray-300 rounded-md p-2"
    />

    <ul class="mt-4">
      <!-- Affiche les tribunaux filtrés -->
      <li
        v-for="court in courtStore.filteredCourts"
        :key="court.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-semibold">{{ court.name }}</h2>
          <p>{{ court.location }} - {{ court.jurisdiction }}</p>
        </div>
        <div>
          <router-link
            :to="`/court/${court.id}`"
            class="text-blue-500 hover:underline mr-2"
          >
            Détails
          </router-link>
          <router-link
            :to="{ path: `/edit/${court.id}`, params: { id: court.id } }"
            class="text-blue-500 hover:underline mr-2"
          >
            Modifier
          </router-link>
          <button
            @click="deleteCourt(court.id)"
            class="text-red-500 hover:underline"
          >
            Supprimer
          </button>
        </div>
      </li>
    </ul>
    <!-- Message si aucun tribunal trouvé -->
    <p v-if="courtStore.filteredCourts.length === 0" class="mt-4 text-gray-500">
      Aucun tribunal correspondant trouvé.
    </p>
  </div>
</template>

<script setup>
import { useCourtStore } from "../stores/courtStore";

const courtStore = useCourtStore();

const deleteCourt = (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce tribunal ?")) {
    courtStore.deleteCourt(id);
  }
};
</script>
