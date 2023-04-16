<script setup>
import { useAuthStore } from '@/stores'
import Navbar from '@/components/shared/Navbar.vue'
const { user } = useAuthStore()
</script>

<template>
  <main>
    <Navbar :user="user" />
  </main>
</template>
