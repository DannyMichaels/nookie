<template>
  <div class="avatar-form">
    <div class="avatar-form__top">
      <v-btn icon="mdi-arrow-left" @click="onBackClick"></v-btn>
    </div>
    <v-form v-model="valid" class="my-10" @submit.prevent="onSubmitClick">
      <v-container style="max-width: 1100px" fluid>
        <v-row>
          <v-col cols="12" md="4" align-self="end">
            <v-img
              class="ml-auto mr-auto"
              :width="100"
              aspect-ratio="16/9"
              cover
              :src="selectedVillager.imageUrl"
              :alt="nickname || selectedVillager.name"
            />
          </v-col>
          <v-col>
            <v-row>
              <v-col sm="12" mb="2">
                <h1 class="text-center text-h1">Form</h1>
              </v-col>

              <v-col sm="12" v-for="error in errors" :key="error" style="padding: 0">
                <p class="text-center text-p text-red">* {{ error }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6" class="col-gutters">
                <v-text-field
                  v-model="nickname"
                  hint="At least 4 characters"
                  label="Nickname"
                  :rules="nicknameRules"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6" class="col-gutters">
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

              <v-col cols="12" sm="12" md="6">
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

<script setup>
import { ref } from 'vue'

defineProps({
  selectedVillager: {
    type: Object,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
})
const emit = defineEmits(['back-click', 'submit'])

const valid = ref(false)
const email = ref('')
const nickname = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const onBackClick = () => {
  emit('back-click')
}
const onSubmitClick = () => {
  emit('submit', {
    email: email.value,
    nickname: nickname.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value
  })
}

const requiredRule = (value) => (value ? true : 'required')
const minLengthRule = (value, length) =>
  value.length >= length ? true : `Min ${length} characters`
const emailRules = [
  requiredRule,
  (value) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
]
const nicknameRules = [requiredRule, (value) => minLengthRule(value, 4)]
const passwordRules = [requiredRule, (value) => minLengthRule(value, 8)]
const passwordConfirmRules = [
  requiredRule,
  (value) => {
    if (value !== password.value) {
      return 'Password and confirmation must match'
    }
    return true
  }
]
</script>

<style scoped>
.avatar-form__top {
  position: absolute;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.avatar-form__top > h1 {
  margin: 0 auto;
}

.col-gutters {
  padding: 12px;
}

@media screen and (max-width: 600px) {
  .col-gutters {
    padding: 12px;
  }
}
</style>
