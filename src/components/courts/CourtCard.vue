<template>
  <div class="border p-4 rounded shadow">
    <h2 class="text-xl font-bold">{{ court.name }}</h2>
    <p><strong>Localisation :</strong> {{ court.location }}</p>
    <p><strong>Compétence :</strong> {{ court.jurisdiction }}</p>
    <p><strong>Contact :</strong> {{ court.contact }}</p>
    <div class="mt-4 flex space-x-2">
      <router-link :to="`/courts/edit/${court._id}`" class="btn-primary"
        >Modifier</router-link
      >
      <button @click="deleteCourt" class="btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { useCourtStore } from "../../store/courtStore";
const props = defineProps({
  court: {
    type: Object,
    required: true,
  },
});

const courtStore = useCourtStore();

const deleteCourt = () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce tribunal ?")) {
    courtStore.removeCourt(props.court._id);
  }
};
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
.btn-danger {
  @apply bg-red-500 text-white px-4 py-2 rounded;
}
</style>
