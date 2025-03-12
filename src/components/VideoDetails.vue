<template>
  <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img :src="video.miniature" alt="miniature" class="w-full h-48 object-cover rounded-md mb-4" />

    <h3 class="font-semibold text-gray-900">{{ video.titre }}</h3>

    <p class="text-gray-500 text-sm">{{ video.description }}</p>

    <p class="text-sm font-bold text-gray-700">212 123 vues</p>
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