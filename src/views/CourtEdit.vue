<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Modifier le Tribunal</h1>
    <div v-if="courtStore.loading">Chargement...</div>
    <div v-else-if="courtStore.court">
      <CourtForm :courtData="courtStore.court" />
    </div>
    <div v-else>
      Tribunal non trouvé.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourtStore } from '../store/courtStore'
import CourtForm from '../components/courts/CourtForm.vue'

const route = useRoute()
const courtStore = useCourtStore()

onMounted(() => {
  courtStore.fetchCourt(route.params.id)
})
</script>
