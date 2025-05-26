
<template>
<div>
    <h2>{{ title }}</h2>
    <RouterLink to="/">Inicio</RouterLink>
    <div>
      <input
        type="text"
        placeholder="Digite o conteúdo do QR Code"
        v-model="text"
      />
    </div>

    <div v-if="text" class="output">
      <img :src="qrCodeDataUrl" alt="QRCode" />

      <input
        class="input-filename"
        placeholder="Digite o nome do arquivo (opcional)"
        v-model="filename"
      />

      <div class="buttons">
        <button @click="downloadPNG">Baixar PNG</button>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { ref, watch } from 'vue'
import QRious from 'qrious'
import { RouterLink, RouterView } from 'vue-router'

const title = ref('Gerador de QRCode')
const text = ref('')
const filename = ref('')
const qrCodeDataUrl = ref('')

const qr = new QRious({ size: 200 })

watch(text, (newText) => {
  qr.value = newText
  qrCodeDataUrl.value = qr.toDataURL()
})

function downloadPNG() {
  const link = document.createElement('a')
  link.href = qrCodeDataUrl.value
  link.download = filename.value ? `${filename.value}.png` : 'qrcode.png'
  link.click()
}
</script>
    