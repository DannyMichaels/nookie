<script setup>
import { ref, onMounted, reactive, onUpdated } from 'vue'
import axios from 'axios'
import VillagersList from '../../components/VillagersList.vue'
import AvatarForm from '../../components/AvatarForm.vue'

const state = reactive({
  allVillagers: [],
  queriedVillagers: [],
  isLoading: true,
  error: false,
  selectedVillager: null
})

onMounted(async () => {
  try {
    const resp = await axios.get('http://localhost:3000/api/villagers')
    state.allVillagers = resp.data
    state.queriedVillagers = resp.data
    state.isLoading = false
  } catch (error) {
    state.error = true
  }
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
  <main class="avatar-create__wrapper--error" v-if="state.error">
    <h1 class="text-h1 text-red text-center">ERROR</h1>
  </main>

  <main class="avatar-create__wrapper" v-else>
    <v-container fluid>
      <v-progress-linear
        indeterminate
        v-if="state.isLoading"
        class="loading__container"
      ></v-progress-linear>

      <template v-else>
        <VillagersList
          v-if="!state.selectedVillager?.id"
          :header="'Choose Your Avatar'"
          :villagers="state.queriedVillagers"
          :onVillagerClick="handleVillagerClick"
        />

        <AvatarForm
          v-if="state.selectedVillager?.id"
          :onBackClick="handleFormBackClick"
          :selectedVillager="state.selectedVillager"
        />
      </template>
    </v-container>
  </main>
</template>

<style scoped>
.avatar-create__wrapper,
.avatar-create__wrapper--error {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
