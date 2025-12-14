<template>
    <navbar />
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Maintenance Schedule</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div v-if="store.isLoading" class="text-center">Loading calendar...</div>
      <Calendar v-else :maintenance="store.maintenance" />
    </div>
  </div>
</template>

<script setup>
    import navbar from '../components/navbar.vue';
</script>

