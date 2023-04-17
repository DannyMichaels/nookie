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
        <div class="bells__container d-flex align-center">
          <span class="d-block text-p mr-1">{{ bellsCount }}</span>
          <img src="@/assets/bells.png" height="50" alt="bells" />
        </div>
      </div>
    </inner-column>
  </nav>
</template>
