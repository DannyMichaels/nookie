<template>
  <v-form v-model="valid" class="my-10">
    <h1 class="text-h1 text-center">Form</h1>
    <v-btn @click="onBackClick">Go back</v-btn>
    <v-container color="bg-white" style="max-width: 1100px" fluid>
      <v-row>
        <v-col cols="1" sm="12">
          <v-img
            class="ml-auto mr-auto"
            :width="100"
            aspect-ratio="16/9"
            cover
            :src="selectedVillager.imageUrl"
            :alt="nickname || selectedVillager.name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
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

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="nickname"
            hint="At least 4 characters"
            label="Nickname"
            :rules="nicknameRules"
            required
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            label="Password"
            counter
            :rules="passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            required
            hide-details="auto"
            @click:append="showPassword = !showPassword"
            hint="At least 8 characters"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="passwordConfirm"
            label="Password Confirm"
            :rules="passwordConfirmRules"
            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPasswordConfirm ? 'text' : 'password'"
            required
            hide-details="auto"
            hint="At least 8 characters"
            @click:append="showPasswordConfirm = !showPasswordConfirm"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  selectedVillager: {
    type: Object,
    required: true
  },
  onBackClick: {
    type: Function,
    required: true
  }
})

const valid = ref(false)
const email = ref('')
const nickname = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const emailRules = [
  (value) => {
    if (value) return true

    return 'required.'
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
]

const nicknameRules = [
  (value) => {
    if (value) return true

    return 'required.'
  },
  (value) => {
    if (value.length >= 4) return true

    return 'Min 4 characters'
  }
]

const passwordRules = [
  (value) => {
    if (value) return true

    return 'required.'
  },

  (value) => {
    if (value.length < 7) {
      return 'Min 8 characters'
    }

    return true
  }
]

const passwordConfirmRules = [
  (value) => {
    if (value) return true

    return 'required.'
  },

  (value) => {
    if (value !== password.value) {
      return 'Password and confirmation must match'
    }
  }
]
</script>
