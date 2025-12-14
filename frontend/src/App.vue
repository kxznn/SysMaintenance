<script setup>
import Navbar from './components/navbar.vue';
</script>

<template>
  <div class="flex">
    <Navbar />
    <main class="flex-1 p-8">
      <router-view></router-view> </main>
  </div>
</template>