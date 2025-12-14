<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
    <p class="text-3xl font-bold mt-2" :class="colorClass">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
    title: String, value: Number, colorClass: String,
});
</script>