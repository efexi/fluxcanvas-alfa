<template>
  <div class="app">
    <h1>FluxCanvas 🧠</h1>

    <div class="upload">
      <input type="file" accept="image/*" @change="onFileChange" />
      <button @click="uploadImage" :disabled="!selectedFile">Subir y Segmentar</button>
    </div>

    <p>{{ message }}</p>
    <img v-if="segmentedImage" :src="segmentedImage" alt="Resultado" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedFile = ref<File | null>(null)
const message = ref('')
const segmentedImage = ref('')

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

async function uploadImage() {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const res = await fetch('http://127.0.0.1:8000/segmentar', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    message.value = `Color dominante: ${data.hex}`
    segmentedImage.value = `http://127.0.0.1:8000/generated/segmented.png?${Date.now()}`
  } catch (err) {
    message.value = 'Error al subir o procesar la imagen'
  }
}
</script>

<style scoped>
.app {
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  padding: 2rem;
}

.upload {
  margin-bottom: 1rem;
}

img {
  margin-top: 1rem;
  border: 1px solid #ccc;
  max-width: 100%;
  max-height: 300px;
}
</style>
