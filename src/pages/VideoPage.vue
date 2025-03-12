<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <SideBar :isOpen="isSidebarOpen" @close-sidebar="closeSidebar" />
    <div class="ml-64 p-6">
      <div class="max-w-4xl mx-auto">
        <VideoDetails :video="video" />
        <CommentsSection class="mt-8" />
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
    const response = await axios.get(`http://localhost:3000/video/${videoId}`);
    video.value = response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
  }
});
</script>