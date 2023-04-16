<script setup>
import { onMounted, reactive } from 'vue'
import api from '@/services/apiConfig'
import VillagersList from '@/components/VillagersList.vue'
import RegisterForm from '@/components/account/RegisterForm.vue'
import { useAuthStore } from '@/stores'
import { router } from '@/router'

const state = reactive({
  allVillagers: [],
  queriedVillagers: [],
  isLoading: true,
  fetchError: false,
  formErrors: [],
  selectedVillager: null
})

onMounted(async () => {
  try {
    const resp = await api.get('/villagers')
    state.allVillagers = resp.data
    state.queriedVillagers = resp.data
    state.isLoading = false
  } catch (error) {
    state.fetchError = true
  }
})

const handleVillagerClick = (villager) => {
  state.selectedVillager = villager
}

const handleFormBackClick = () => {
  state.selectedVillager = null
}

const handleSubmit = async (formData) => {
  state.formErrors = []
  const authStore = useAuthStore()

  const { password, passwordConfirm } = formData

  if (password !== passwordConfirm) {
    return (state.formErrors = ['Password and password confirmation must match'])
  }

  try {
    const user = {
      ...formData,
      villagerId: state.selectedVillager?.id
    }

    await authStore.register(user)
    await router.push('/')
  } catch (error) {
    state.formErrors = error.response.data.errors
  }
}
</script>

<template>
  <main class="avatar-create__wrapper--error" v-if="state.fetchError">
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
          @villager-click="handleVillagerClick"
        />

        <RegisterForm
          v-if="state.selectedVillager?.id"
          :selectedVillager="state.selectedVillager"
          :errors="state.formErrors"
          @back-click="handleFormBackClick"
          @submit="handleSubmit"
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
