<template>
    <div class="grid grid-cols-3 gap-4 p-4">
      <div v-for="video in videos" :key="video.id" class="bg-gray-300 p-4 rounded">
        <p>{{ video.title }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videos: [
          { id: 1, title: 'Vue.js Basics' },
          { id: 2, title: 'Tailwind CSS Guide' },
          { id: 3, title: 'Building with Vite' }
        ]
      };
    }
  };
  </script>