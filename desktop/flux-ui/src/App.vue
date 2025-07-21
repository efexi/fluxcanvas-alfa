<template>
  <div class="app">
    <h1>FluxCanvas 🧠</h1>
    <button @click="generateImage">Generar Imagen</button>
    <p>{{ message }}</p>
    <img v-if="imageUrl" :src="imageUrl" alt="Imagen generada" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const imageUrl = ref('')

async function generateImage() {
  try {
    const res = await fetch('http://127.0.0.1:5000/generate-image')
    const data = await res.json()
    message.value = data.message
    imageUrl.value = `http://127.0.0.1:5000/generated/image.png?timestamp=${Date.now()}`
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

img {
  margin-top: 1rem;
  border: 1px solid #ccc;
  max-width: 256px;
}
</style>
