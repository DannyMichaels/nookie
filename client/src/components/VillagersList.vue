<script setup>
import { useVirtualList } from '@vueuse/core'

const props = defineProps({
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

const { list, containerProps, wrapperProps } = useVirtualList(props.villagers, {
  itemHeight: 188
})
</script>

<template>
  <section v-bind="containerProps">
    <h1 class="text-h1 text-center pt-10" v-if="header">{{ header }}</h1>

    <v-container class="villagers__container" v-bind="containerProps">
      <div class="pt-10" v-bind="wrapperProps">
        <v-row no-gutters>
          <v-col v-for="{ data } in list" :key="data.id" class="villager__container">
            <img
              @click="onVillagerClick(data)"
              :width="100"
              :src="data.imageUrl"
              :alt="data.name"
              referrerpolicy="no-referrer"
              class="villager"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.villagers__container {
  height: 100%;
}

.villager__container {
  margin: 10px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  height: 188px;
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
