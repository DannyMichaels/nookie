<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const state = reactive({
  allVillagers: []
})

onMounted(() => {
  state.allVillagers = ['1', '2', '3']
})
</script>

<template>
  <h1>AvatarCreate</h1>
</template>
