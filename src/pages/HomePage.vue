<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar @toggle-sidebar="toggleSidebar" @search-videos="filterVideos" />
    <SideBar :isOpen="isSidebarOpen" @close-sidebar="closeSidebar" />
    <div
        :class="{'ml-0 md:ml-0': !isSidebarOpen, 'ml-0 md:ml-64': isSidebarOpen}"
        class="p-3 md:p-6 transition-all duration-300"
    >
      <h1 class="text-xl md:text-2xl font-bold mb-4 md:mb-6">Accueil</h1>
      <VideoGrid :videos="filteredVideos" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
import VideoGrid from '../components/VideoGrid.vue';

const videos = ref([]);
const isSidebarOpen = ref(false);
const searchTerm = ref('');

const filteredVideos = computed(() => {
  if (!searchTerm.value) return videos.value;
  return videos.value.filter(video =>
      video.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const filterVideos = (term) => {
  searchTerm.value = term;
};

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/videos`);
    videos.value = response.data;
    console.log('Vidéos récupérées :', videos.value);
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
  }
});
</script>