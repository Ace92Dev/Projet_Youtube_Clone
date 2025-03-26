<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative w-full pb-[56.25%]">
      <img
          :src="getImageUrl(video.miniature)"
          alt="Miniature de la vidéo"
          class="absolute inset-0 w-full h-full object-cover"
          @error="handleImageError"
      />
    </div>

    <div class="p-3 md:p-4">
      <h2 class="text-base md:text-lg font-bold text-gray-900 line-clamp-2">{{ video.titre }}</h2>
      <p class="text-xs md:text-sm text-gray-500 mt-1">Publié il y a 3 jours - 423 983 vues</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true,
    miniature: String,
    titre: String,
  },
});

const getImageUrl = (imageName) => {
  const url = `http://localhost:3000/images/${imageName}`;
  console.log('URL de l\'image :', url);
  return url;
};

const handleImageError = (event) => {
  event.target.src = '/assets/fallback.jpg';
};
</script>