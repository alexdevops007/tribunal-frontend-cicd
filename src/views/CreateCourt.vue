<!-- src/views/CreateCourt.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Ajouter un Tribunal</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-gray-700">Nom</label>
        <input
          v-model="court.name"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Nom du tribunal"
          required
        />
      </div>
      <div>
        <label class="block text-gray-700">Emplacement</label>
        <input
          v-model="court.location"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Emplacement"
          required
        />
      </div>
      <div>
        <label class="block text-gray-700">Juridiction</label>
        <input
          v-model="court.jurisdiction"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Juridiction"
          required
        />
      </div>
      <div>
        <label class="block text-gray-700">Contact</label>
        <input
          v-model="court.contact"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Contact"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCourtStore } from '../stores/courtStore'
import { useRouter } from 'vue-router'

const courtStore = useCourtStore()
const router = useRouter()

const court = ref({
  name: '',
  location: '',
  jurisdiction: '',
  contact: '',
})

const submitForm = () => {
  courtStore.addCourt({ ...court.value })
  router.push('/')
}
</script>
