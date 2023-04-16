<script setup>
import { ref } from 'vue'
const { user } = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const bellsCount = user.bells || 0

// const on = ref(false)
// const attrs = ref(null)
</script>

<template>
  <nav>
    <inner-column class="d-flex align-center justify-space-between">
      <div class="nav__left">Nav</div>

      <div class="nav__right">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="bells__container d-flex align-center">
              <span class="d-block text-p mr-1">{{ bellsCount }}</span>
              <img src="@/assets/bells.png" height="50" />
            </div>
          </template>

          <span>Bells</span>
        </v-tooltip>
      </div>
    </inner-column>
  </nav>
</template>
