<script setup lang="ts">
import { Space } from '@/models/Character';
import CharacterComponente from './CharacterComponente.vue';

const props = defineProps({ 
  space: { type: Space, required: true }
});
</script>

<template>
  <div class="flex flex-column space">
    <h3 class="space-title">{{ space.name }}</h3>
    <div class="flex flex-row flex-wrap">
      <CharacterComponente
        v-for="(person, personId) in space.persons"
        :key="personId"
        :character="person"
        :showButtons="false"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.space {
  margin: 1rem;
  padding: 1rem;
  background-color: #e3e3e3;
  border-radius: 8px;
}

.space-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}
</style>
