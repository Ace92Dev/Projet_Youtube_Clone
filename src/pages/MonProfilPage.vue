<!-- src/pages/MonProfilPage.vue -->
<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold mb-6">Mon Profil</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="loading" class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="p-4 bg-red-100 text-red-700 rounded-md mb-4">
        {{ error }}
      </div>

      <div v-else>
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div class="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
            <img
                :src="userData.photo || 'https://via.placeholder.com/128'"
                alt="Photo de profil"
                class="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 class="text-xl font-bold mb-1">{{ userData.prenom }} {{ userData.nom }}</h2>
            <p class="text-gray-600 mb-2">{{ userData.email }}</p>
            <p class="text-sm text-gray-500">Membre depuis {{ formatDate(userData.dateInscription) }}</p>
          </div>
        </div>

        <form @submit.prevent="sauvegarderProfil" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                  v-model="formData.prenom"
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                  v-model="formData.nom"
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                v-model="formData.email"
                type="email"
                class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                v-model="formData.description"
                rows="4"
                class="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div class="flex items-center justify-end space-x-4 pt-4">
            <button
                type="button"
                @click="router.back()"
                class="px-4 py-2 border border-gray-300 rounded-md"
            >
              Annuler
            </button>
            <button
                type="submit"
                :disabled="isSaving"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {{ isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(true);
const isSaving = ref(false);
const error = ref(null);
const userData = ref({});
const formData = ref({
  prenom: '',
  nom: '',
  email: '',
  description: ''
});

onMounted(async () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/connexion');
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.isGuest) {
      router.push('/connexion');
      return;
    }

    const response = await axios.get(`http://localhost:3000/utilisateurs/${user.id}`);
    userData.value = response.data;

    formData.value = {
      prenom: userData.value.prenom || '',
      nom: userData.value.nom || '',
      email: userData.value.email || '',
      description: userData.value.description || ''
    };
  } catch (err) {
    console.error('Erreur lors du chargement du profil:', err);
    error.value = "Impossible de charger les données du profil.";
  } finally {
    loading.value = false;
  }
});

const sauvegarderProfil = async () => {
  try {
    isSaving.value = true;
    const user = JSON.parse(localStorage.getItem('user'));

    await axios.put(`http://localhost:3000/utilisateurs/${user.id}`, formData.value);

    userData.value = { ...userData.value, ...formData.value };

    const updatedUser = { ...user, ...formData.value };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    alert('Profil mis à jour avec succès!');
  } catch (err) {
    console.error('Erreur lors de la sauvegarde du profil:', err);
    error.value = "Impossible de sauvegarder les modifications.";
  } finally {
    isSaving.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
</script>