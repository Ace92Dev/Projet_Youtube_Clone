<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

        <div v-if="message" :class="['p-3 mb-4 rounded', message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
          {{ message.text }}
        </div>

        <form @submit.prevent="inscription" class="space-y-4">
          <div>
            <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
                v-model="formData.nom"
                id="nom"
                type="text"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
                v-model="formData.prenom"
                id="prenom"
                type="text"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                v-model="formData.email"
                id="email"
                type="email"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="motDePasse" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
                v-model="formData.motDePasse"
                id="motDePasse"
                type="password"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="confirmMotDePasse" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
                v-model="formData.confirmMotDePasse"
                id="confirmMotDePasse"
                type="password"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
              :disabled="loading"
          >
            <span v-if="loading">Inscription en cours...</span>
            <span v-else>S'inscrire</span>
          </button>
        </form>

        <p class="mt-4 text-center text-gray-600">
          Vous avez déjà un compte?
          <router-link to="/connexion" class="text-blue-600 hover:underline">Connectez-vous</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(false);
const message = ref(null);

const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  motDePasse: '',
  confirmMotDePasse: ''
});

const inscription = async () => {
  try {
    if (formData.value.motDePasse !== formData.value.confirmMotDePasse) {
      message.value = {
        type: 'error',
        text: "Les mots de passe ne correspondent pas"
      };
      return;
    }

    loading.value = true;
    message.value = null;

    const userData = {
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      email: formData.value.email,
      mot_de_passe: formData.value.motDePasse
    };

    const response = await axios.post('http://localhost:3000/utilisateurs', userData);

    message.value = {
      type: 'success',
      text: "Compte créé avec succès! Redirection vers la page de connexion..."
    };

    setTimeout(() => {
      router.push('/connexion');
    }, 1500);

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);

    if (error.response && error.response.data && error.response.data.message) {
      message.value = {
        type: 'error',
        text: error.response.data.message
      };
    } else {
      message.value = {
        type: 'error',
        text: "Une erreur s'est produite lors de l'inscription"
      };
    }
  } finally {
    loading.value = false;
  }
};
</script>