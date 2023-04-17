<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores'
import { onMounted } from 'vue'
const { verify } = useAuthStore()
onMounted(async () => {
  try {
    await verify()
  } catch (error) {
    console.log('error verifying user', error)
  }
})
</script>

<template>
  <v-app class="bg-surface-variant">
    <RouterView />
  </v-app>
</template>

<style scoped></style>
