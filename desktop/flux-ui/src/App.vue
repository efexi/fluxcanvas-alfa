<template>
  <div class="app">
    <h1>FluxCanvas 🧠</h1>
    <button @click="generateImage">Generar Imagen</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

async function generateImage() {
  try {
    const res = await fetch('http://127.0.0.1:5000/generate-image')
    const data = await res.json()
    message.value = data.message
  } catch (error) {
    message.value = 'Error al llamar al backend'
    console.error(error)
  }
}
</script>

<style scoped>
.app {
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  padding: 2rem;
}
</style>
