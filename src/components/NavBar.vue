<template>
  <nav class="flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg">
    <div class="flex items-center space-x-4">
      <button 
        @click="$emit('toggle-sidebar')" 
        class="text-xl hover:text-gray-300 transition-colors"
      >
        ☰
      </button>
      <h1 class="text-xl font-bold">YouTube Clone</h1>
    </div>
    <input 
      type="text" 
      placeholder="Rechercher..." 
      class="p-2 rounded-lg bg-gray-700 text-white w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @input="search"
    />
    <div class="flex items-center space-x-4">
      <button class="hover:text-gray-300 transition-colors">🔔</button>
      <button class="hover:text-gray-300 transition-colors">👤</button>
    </div>
  </nav>
</template>

<script setup>
defineEmits(['toggle-sidebar']);
import { ref } from 'vue';
  
const query = ref('');
const search = () => {
  console.log('Recherche en cours pour:', query.value);
};
</script>