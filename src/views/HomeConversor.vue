<template>
  <div id="main">
    <h2>{{ title }}</h2>
    <RouterLink to="/">Início</RouterLink>

    <input type="file" id="file" @change="onFileChange" />

    <button class="btn" :disabled="!file || isLoading" @click="convertFile">
      {{ isLoading ? 'Gerando PDF...' : 'Gerar PDF' }}
    </button>

    <div v-if="isLoading" style="margin-top: 10px;">
      <p>Processando: {{ Math.round(progress) }}%</p>
      <div style="width: 100%; background: #eee; border-radius: 4px; overflow: hidden;">
        <div :style="barStyle"></div>
      </div>
    </div>

    <div v-if="downloadUrl">
      <a :href="downloadUrl" :download="downloadFilename">Baixar PDF</a>
    </div>

    <div v-if="error" style="color:red">{{ error }}</div>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const title            = ref('Conversor para PDF')
const file             = ref(null)
const downloadUrl      = ref('')
const downloadFilename = ref('')
const error            = ref('')
const isLoading        = ref(false)
const progress         = ref(0)
let progressInterval   = null

const barStyle = computed(() => ({
  width: progress.value + '%',
  height: '10px',
  background: '#4caf50',
  transition: 'width 0.3s ease'
}))

function onFileChange(e) {
  if (downloadUrl.value) URL.revokeObjectURL(downloadUrl.value)
  file.value = e.target.files[0]
  downloadUrl.value = ''
  error.value = ''
}

async function convertFile() {
  if (!file.value) return

  isLoading.value = true
  progress.value = 0
  startProgress()

  error.value = ''
  downloadUrl.value = ''
  downloadFilename.value = ''

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const res = await fetch('https://utilidades-0sg8.onrender.com/convert', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    if (!res.ok) throw new Error(await res.text())

    const blob = await res.blob()
    downloadUrl.value = URL.createObjectURL(blob)
    downloadFilename.value = file.value.name.replace(/\.[^/.]+$/, '') + '.pdf'
  } catch (err) {
    error.value = err.message
  } finally {
    stopProgress()
    progress.value = 100
    isLoading.value = false
  }
}

function startProgress() {
  progressInterval = setInterval(() => {
    if (progress.value < 95) {
      progress.value += Math.random() * 5;  
      if (progress.value > 95) progress.value = 95;
    }
  }, 200);
}

function stopProgress() {
  clearInterval(progressInterval)
  progress.value = 100
}
</script>
