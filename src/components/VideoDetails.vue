<template>
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div class="aspect-w-16 aspect-h-9 w-full mb-4">
      <iframe
          :src="`https://www.youtube.com/embed/${getVideoId(video.url)}`"
          class="w-full h-full rounded-md"
          frameborder="0"
          allowfullscreen
      ></iframe>
    </div>

    <h3 class="font-semibold text-xl md:text-2xl text-gray-900 mb-2">{{ video.titre }}</h3>

    <p class="text-gray-500 text-sm md:text-base mb-4">{{ video.description }}</p>

    <p class="text-sm md:text-base font-bold text-gray-700">423 983 vues</p>
  </div>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const getVideoId = (url) => {
  if (!url) return '';

  // Extraction de l'identifiant YouTube à partir de l'URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
      ? match[2]
      : '';
};
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>