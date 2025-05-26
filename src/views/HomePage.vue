<template>
    <div id="app">
      <h1>{{ title }}</h1>
      <RouterLink to="/qrcode">QrCode</RouterLink>
      <RouterLink to="/conversor">Conversor</RouterLink>
      <RouterView />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  
  const title = ref('Utilidades');
  </script>
  
  <style scoped>
  @import '../style/style.css';
  </style>
  