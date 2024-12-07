<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block">Nom du Tribunal</label>
      <input
        v-model="form.name"
        type="text"
        class="input-field"
        placeholder="Nom du tribunal"
        required
      />
    </div>
    <div>
      <label class="block">Localisation</label>
      <input
        v-model="form.location"
        type="text"
        class="input-field"
        placeholder="Localisation"
        required
      />
    </div>
    <div>
      <label class="block">Compétence</label>
      <input
        v-model="form.jurisdiction"
        type="text"
        class="input-field"
        placeholder="Compétence"
        required
      />
    </div>
    <div>
      <label class="block">Contact</label>
      <input
        v-model="form.contact"
        type="text"
        class="input-field"
        placeholder="Contact"
        required
      />
    </div>
    <button type="submit" class="btn-primary">
      {{ isEdit ? "Mettre à jour" : "Créer" }}
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCourtStore } from "../../stores/courtStore";

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

// Remplir le formulaire si courtData existe (édition)
if (props.courtData && props.courtData.id) {
  isEdit.value = true;
  form.value = { ...props.courtData };
}

// Gestion du formulaire
const handleSubmit = async () => {
  if (isEdit.value) {
    // Mise à jour d'un tribunal
    courtStore.editCourt(props.courtData.id, form.value);
  } else {
    // Création d'un nouveau tribunal
    courtStore.addCourt(form.value);
  }
  router.push("/"); // Redirige vers la liste après action
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
