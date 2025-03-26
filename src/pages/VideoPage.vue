<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <SideBar :isOpen="isSidebarOpen" @close-sidebar="closeSidebar" />
    <div
        :class="{'ml-0 md:ml-0': !isSidebarOpen, 'ml-0 md:ml-64': isSidebarOpen}"
        class="p-3 md:p-6 transition-all duration-300"
    >
      <div class="max-w-4xl mx-auto">
        <div v-if="video">
          <VideoDetails :video="video" />
          <CommentsSection class="mt-4 md:mt-8" />
        </div>
        <div v-else class="text-center py-10">
          <p class="text-lg font-medium text-gray-600">Chargement de la vidéo...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
import VideoDetails from '../components/VideoDetails.vue';
import CommentsSection from '../components/CommentsSection.vue';

const video = ref(null);
const isSidebarOpen = ref(false);
const route = useRoute();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

onMounted(async () => {
  try {
    const videoId = route.params.id;
    const response = await axios.get(`http://localhost:3000/videos/${videoId}`);
    video.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
  }
});
</script>