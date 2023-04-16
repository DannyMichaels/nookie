<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useAuthStore } from '@/stores'

const { user } = useAuthStore()
</script>

<template>
  <main>
    {{ JSON.stringify(user) }}
    <TheWelcome />
  </main>
</template>
