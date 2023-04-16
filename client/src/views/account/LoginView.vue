<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
const valid = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const formError = ref('')

const requiredRule = (value) => (value ? true : 'required')

const emailRules = [
  requiredRule,
  (value) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
]

const handleSubmit = async () => {
  const authStore = useAuthStore()
  try {
    await authStore.login(email.value, password.value)
  } catch (error) {
    return (formError.value = error.response?.data?.error)
  }
}
</script>

<template>
  <div class="login__wrapper">
    <v-form v-model="valid" class="my-10" @submit.prevent="handleSubmit">
      <v-container style="max-width: 1100px" fluid>
        <div class="mb-10">
          <h1 class="text-h1 text-center">Login</h1>
        </div>

        <div class="mb-10">
          <p class="text-h4 text-center text-red" v-if="formError">{{ formError }}</p>
        </div>

        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              email
              required
              autofocus
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="password"
              label="Password"
              :rules="[requiredRule]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              required
              hide-details="auto"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn type="submit" :disabled="!valid">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<style scoped>
.login__wrapper {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
form {
  width: 100%;
}
</style>
