<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Liste des Tribunaux</h1>
    <router-link to="/courts/create" class="btn-primary mb-4 inline-block"
      >Ajouter un Tribunal</router-link
    >
    <div v-if="courtStore.loading">Chargement...</div>
    <div v-else>
      <div v-if="courtStore.courts.length">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CourtCard
            v-for="court in courtStore.courts"
            :key="court._id"
            :court="court"
          />
        </div>
      </div>
      <div v-else>Aucun tribunal trouvé.</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCourtStore } from "../store/courtStore";
import CourtCard from "../components/courts/CourtCard.vue";

const courtStore = useCourtStore();

onMounted(() => {
  courtStore.fetchCourts();
});
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
</style>
