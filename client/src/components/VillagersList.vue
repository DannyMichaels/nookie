<script setup>
defineProps({
  villagers: {
    type: Array,
    required: true
  },

  header: {
    type: String,
    required: false
  }
})
const emit = defineEmits(['villager-click'])

const onVillagerClick = (villager) => {
  emit('villager-click', villager)
}
</script>

<template>
  <v-container class="villagers__container">
    <h1 class="text-h1 text-center pt-10" v-if="header">{{ header }}</h1>

    <v-row no-gutters class="pt-10">
      <v-col v-for="villager in villagers" :key="villager.id" class="villager__container">
        <img
          @click="onVillagerClick(villager)"
          :width="100"
          :src="villager.imageUrl"
          :alt="villager.name"
          referrerpolicy="no-referrer"
          class="villager"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.villager__container {
  margin: 10px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
}

.villager {
  cursor: pointer;
  transition: transform 250ms ease-in-out;
}

.villager:hover {
  transform: scale(1.04);
}

.villager:active {
  filter: brightness(1.2);
}
</style>
