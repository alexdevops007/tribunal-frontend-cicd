<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block">Nom du Tribunal</label>
      <input v-model="form.name" type="text" class="input-field" required />
    </div>
    <div>
      <label class="block">Localisation</label>
      <input v-model="form.location" type="text" class="input-field" required />
    </div>
    <div>
      <label class="block">Compétence</label>
      <input
        v-model="form.jurisdiction"
        type="text"
        class="input-field"
        required
      />
    </div>
    <div>
      <label class="block">Contact</label>
      <input v-model="form.contact" type="text" class="input-field" required />
    </div>
    <button type="submit" class="btn-primary">
      {{ isEdit ? "Mettre à jour" : "Créer" }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCourtStore } from "../../store/courtStore";

const props = defineProps({
  courtData: {
    type: Object,
    default: () => ({}),
  },
});

const courtStore = useCourtStore();
const router = useRouter();
const isEdit = ref(false);

const form = ref({
  name: "",
  location: "",
  jurisdiction: "",
  contact: "",
});

if (props.courtData && props.courtData._id) {
  isEdit.value = true;
  form.value = { ...props.courtData };
}

const handleSubmit = async () => {
  if (isEdit.value) {
    await courtStore.editCourt(props.courtData._id, form.value);
  } else {
    await courtStore.addCourt(form.value);
  }
  router.push("/courts");
};
</script>

<style scoped>
.input-field {
  @apply border p-2 w-full rounded;
}
.btn-primary {
  @apply bg-green-500 text-white px-4 py-2 rounded;
}
</style>
