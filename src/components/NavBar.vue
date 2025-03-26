<template>
  <nav class="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-900 text-white shadow-lg">
    <div class="flex items-center space-x-4 w-full md:w-auto mb-3 md:mb-0">
      <button
          @click="$emit('toggle-sidebar')"
          class="text-xl hover:text-gray-300 transition-colors"
      >
        ☰
      </button>
      <h1 class="text-xl font-bold">YouTube Clone</h1>
    </div>
    <input
        v-model="recherche"
        type="text"
        placeholder="Rechercher..."
        class="p-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 md:mb-0"
        @input="filteredVideos"
    />
    <div class="flex items-center space-x-4 w-full md:w-auto justify-end">
      <button class="hover:text-gray-300 transition-colors">🔔</button>
      <router-link to="/connexion" class="hover:text-gray-300 transition-colors">👤</router-link>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(['toggle-sidebar', 'search-videos']);
import { ref } from 'vue';

const recherche = ref('');
const search = () => {
  emit('search-videos', recherche.value);
};
</script>