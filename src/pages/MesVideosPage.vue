<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 class="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Mes Vidéos</h1>
      <button
          @click="router.push('/upload')"
          class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Téléverser une vidéo
      </button>
    </div>

    <div v-if="loading" class="flex justify-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 text-red-700 rounded-md mb-4">
      {{ error }}
    </div>

    <div v-else-if="videos.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <h3 class="text-lg font-medium mb-2">Vous n'avez pas encore de vidéos</h3>
      <p class="text-gray-600 mb-4">Commencez à partager votre contenu dès maintenant</p>
      <button
          @click="router.push('/upload')"
          class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Téléverser ma première vidéo
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="video in videos" :key="video.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="relative pb-[56.25%]">
          <img
              :src="video.miniature || 'https://via.placeholder.com/640x360'"
              alt="Miniature de la vidéo"
              class="absolute inset-0 w-full h-full object-cover"
          />
          <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
            {{ formatDuration(video.duree) }}
          </span>
        </div>

        <div class="p-4">
          <h3 class="font-medium mb-1 line-clamp-2">{{ video.titre }}</h3>
          <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span>{{ video.vues }} vues</span>
            <span>{{ formatDate(video.datePublication) }}</span>
          </div>

          <div class="flex space-x-2">
            <button
                @click="editVideo(video.id)"
                class="flex-1 py-1 px-3 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Modifier
            </button>
            <button
                @click="confirmDelete(video.id)"
                class="flex-1 py-1 px-3 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(true);
const error = ref(null);
const videos = ref([]);

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

    const response = await axios.get(`http://localhost:3000/utilisateurs/${user.id}/videos`);
    videos.value = response.data;
  } catch (err) {
    console.error('Erreur lors du chargement des vidéos:', err);
    error.value = "Impossible de charger vos vidéos.";
  } finally {
    loading.value = false;
  }
});

const editVideo = (videoId) => {
  router.push(`/videos/${videoId}/edit`);
};

const confirmDelete = async (videoId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
    try {
      await axios.delete(`http://localhost:3000/videos/${videoId}`);
      videos.value = videos.value.filter(v => v.id !== videoId);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Impossible de supprimer la vidéo.');
    }
  }
};

const formatDuration = (seconds) => {
  if (!seconds) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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