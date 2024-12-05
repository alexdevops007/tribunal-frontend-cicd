<!-- src/views/CourtList.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Liste des Tribunaux</h1>
    <router-link
      to="/create"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Ajouter un Tribunal
    </router-link>
    <ul class="mt-4">
      <li
        v-for="court in courts"
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
          <button
            @click="deleteCourt(court.id)"
            class="text-red-500 hover:underline"
          >
            Supprimer
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCourtStore } from '../stores/courtStore'
import { onMounted } from 'vue'

const courtStore = useCourtStore()
const { courts, deleteCourt } = courtStore

onMounted(() => {
  // Chargement initial si nécessaire
})
</script>
