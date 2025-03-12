<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="relative w-full h-64 mb-6">
      <img :src="video.miniature" alt="Video Thumbnail" class="w-full h-full object-cover rounded-lg" />
      <div class="absolute top-0 left-0 text-white p-2 bg-black bg-opacity-50 rounded-tl-lg">Lecteur</div>
    </div>

    <h2 class="text-2xl font-bold text-gray-900">{{ video.title }}</h2>

    <p class="text-sm text-gray-500 mt-2">Publié il y a 3 jours - 123 vues</p>

    <p class="mt-4 text-gray-700">{{ video.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
});
</script>