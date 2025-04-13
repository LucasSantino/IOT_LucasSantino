<script setup lang="ts">
import { Space } from '@/models/characters';
import CharacterComponente from './CharacterComponent.vue';

// Tipagem correta com defineProps
const props = defineProps<{ space: Space }>();
</script>

<template>
  <div class="flex flex-column space">
    <h3 class="space-title">{{ props.space.name }}</h3>
    <div class="flex flex-row flex-wrap">
      <CharacterComponente
        v-for="(characters, charactersId) in props.space.characters"
        :key="charactersId"
        :character="characters"
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
