<template>
  <li 
    class="hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors"
    @click="navigate"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});

const navigate = () => {
  window.location.href = to;
};
</script>