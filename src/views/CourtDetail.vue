<!-- src/views/CourtDetail.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ court.name }}</h1>
    <p><strong>Emplacement :</strong> {{ court.location }}</p>
    <p><strong>Juridiction :</strong> {{ court.jurisdiction }}</p>
    <p><strong>Contact :</strong> {{ court.contact }}</p>
    <router-link
      to="/"
      class="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded"
    >
      Retour à la liste
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCourtStore } from '../stores/courtStore'
import { computed } from 'vue'

const route = useRoute()
const courtStore = useCourtStore()
const court = computed(() => courtStore.getCourtById(route.params.id))
</script>
