<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="font-bold text-2xl mb-6 text-gray-800">Commentaires</h3>
    <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-200 pb-4 mb-4">
      <p class="font-semibold text-gray-900">{{ comment.author }}</p>
      <p class="text-sm text-gray-600 mt-1">{{ comment.text }}</p>
    </div>
    <textarea
      v-model="newComment"
      placeholder="Ajoutez un commentaire..."
      class="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      rows="3"
    ></textarea>
    <button
      @click="addComment"
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
    >
      Publier
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const comments = ref([
  { id: 1, author: 'Utilisateur1', text: 'Super vidéo, merci!' },
  { id: 2, author: 'Utilisateur2', text: 'Très instructif.' },
  { id: 3, author: 'Utilisateur3', text: 'J\'adore ce contenu!' }
]);

const newComment = ref('');

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({ id: comments.value.length + 1, author: 'Utilisateur', text: newComment.value });
    newComment.value = '';
  }
};
</script>