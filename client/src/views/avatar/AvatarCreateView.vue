<script setup>
import { ref, onMounted, reactive, onUpdated } from 'vue'
import axios from 'axios'
import VillagersList from '../../components/VillagersList.vue'
import AvatarForm from '../../components/AvatarForm.vue'

const state = reactive({
  allVillagers: [],
  selectedVillager: null
})

onMounted(() => {
  axios.get('http://localhost:3000/api/villagers').then((resp) => {
    state.allVillagers = resp.data
  })
})

onUpdated(() => {
  console.log(state.selectedVillager?.id)
})

const handleVillagerClick = (villager) => {
  state.selectedVillager = villager
}

const handleFormBackClick = () => {
  state.selectedVillager = null
}
</script>

<template>
  <main class="avatar-create__wrapper">
    <VillagersList
      v-if="!state.selectedVillager?.id"
      :villagers="state.allVillagers"
      :onVillagerClick="handleVillagerClick"
    />

    <AvatarForm
      v-if="state.selectedVillager?.id"
      :onBackClick="handleFormBackClick"
      :selectedVillager="state.selectedVillager"
    />
  </main>
</template>
