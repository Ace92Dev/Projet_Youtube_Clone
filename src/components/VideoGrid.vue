<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <VideoCard 
      v-for="video in videos" 
      :key="video.id_videos" 
      :video="{
        id: video.id_videos,
        titre: video.titre,
        miniature: video.miniature,
        description: video.description,
        url: video.url
      }" 
    />
  </div>
</template>

<script setup>
import VideoCard from './VideoCard.vue';

defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

</script>