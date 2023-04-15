<script setup>
defineProps({
  villagers: {
    type: Array,
    required: true
  },
  onVillagerClick: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <v-container class="villagers__container">
    <h1 class="text-h1 text-center pt-10 pb-10">Select Villager</h1>
    <v-row no-gutters>
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
  opacity: 0.9;
}

.villager:active {
  filter: grayscale(1);
}
</style>
