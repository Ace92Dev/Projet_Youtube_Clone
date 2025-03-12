<template>
  <aside 
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 shadow-lg z-40"
  >
    <button 
      @click="$emit('close-sidebar')" 
      class="absolute top-4 right-4 text-xl hover:text-gray-300 transition-colors"
    >
      ×
    </button>

    <ul class="space-y-2 mt-8">
      <li class="hover:bg-gray-700 p-2 rounded transition-colors">🏠 Accueil</li>
      <li class="hover:bg-gray-700 p-2 rounded transition-colors">🔥 Tendances</li>
      <li class="hover:bg-gray-700 p-2 rounded transition-colors">📺 Abonnements</li>
      <li class="hover:bg-gray-700 p-2 rounded transition-colors">📜 Historique</li>
    </ul>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close-sidebar']);
</script>