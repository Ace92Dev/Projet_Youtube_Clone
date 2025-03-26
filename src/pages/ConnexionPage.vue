<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-6 text-center">Connexion</h2>

        <div v-if="message" :class="['p-3 mb-4 rounded', message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
          {{ message.text }}
        </div>

        <form @submit.prevent="connexion" class="space-y-4">
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

          <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
              :disabled="loading"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </form>

        <div class="mt-4 flex flex-col items-center">
          <p class="text-center text-gray-600">
            Pas encore de compte?
            <router-link to="/inscription" class="text-blue-600 hover:underline">Inscrivez-vous</router-link>
          </p>

          <div class="mt-4 w-full flex items-center">
            <hr class="flex-grow border-gray-300" />
            <span class="px-2 text-gray-500 text-sm">OU</span>
            <hr class="flex-grow border-gray-300" />
          </div>

          <button
              @click="continuerCommeInvite"
              class="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition duration-200 font-medium flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Continuer en tant qu'invité
          </button>
        </div>
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
  email: '',
  motDePasse: ''
});

const connexion = async () => {
  try {
    loading.value = true;
    message.value = null;

    const userData = {
      email: formData.value.email,
      mot_de_passe: formData.value.motDePasse
    };

    const response = await axios.post('http://localhost:3000/connexion', userData);

    message.value = {
      type: 'success',
      text: "Connexion réussie! Redirection..."
    };

    localStorage.setItem('user', JSON.stringify(response.data.utilisateur));

    setTimeout(() => {
      router.push('/');
    }, 1500);

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);

    if (error.response && error.response.data && error.response.data.message) {
      message.value = {
        type: 'error',
        text: error.response.data.message
      };
    } else {
      message.value = {
        type: 'error',
        text: "Une erreur s'est produite lors de la connexion"
      };
    }
  } finally {
    loading.value = false;
  }
};

const continuerCommeInvite = () => {
  const guestUser = {
    id: 'guest',
    nom: 'Invité',
    prenom: 'Invité',
    role: 'guest',
    isGuest: true
  };

  router.push('/');
};
</script>