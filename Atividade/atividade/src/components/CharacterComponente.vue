<script setup lang="ts">
import { Character } from '@/models/Character';
import { ref } from 'vue';

const props = defineProps({
  character: { type: Character, required: true },
  showInfo: { type: Boolean, default: true },
  showButtons: { type: Boolean, default: true },
});

const emit = defineEmits(['delete']);
const expanded = ref(false);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

const handleDelete = () => {
  emit('delete');
};
</script>

<template>
  <section class="card" :class="{ expanded: expanded }" @click="toggleExpanded">      
    <h5>{{ props.character.name }}</h5>

    <div v-if="expanded">
      <p><strong>Idade:</strong> {{ props.character.birth_year }}</p>
      <p><strong>Altura:</strong> {{ props.character.height }}</p>
      <p><strong>Peso:</strong> {{ props.character.mass }}</p>
      <p><strong>Imagem:</strong> {{ props.character.image }}</p>
    </div>
    
    <div v-else class="hint">Clique para ver mais</div>

    <div class="delete-btn" v-if="props.showButtons" @click.stop="handleDelete">
      <span class="material-icons">delete</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card {
  background-color: rgba(46, 46, 46, 0.75);
  border: 1px solid #555;
  width: 12rem;
  min-height: 10rem;
  margin: 0.5rem;
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
  cursor: pointer;
  transition: all 0.4s ease;
  color: #f0f0f0;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    background-color: rgba(58, 58, 58, 0.85);
  }

  &.expanded {
    width: 16rem;
    min-height: 14rem;
  }

  .hint {
    font-size: 0.85rem;
    color: #ccc;
    opacity: 0.8;
  }

  .delete-btn {
    margin-top: 0.5rem;
    cursor: pointer;
    color: #f44336;

    .material-icons {
      font-size: 1.2rem;
    }

    &:hover {
      color: #e53935;
    }
  }
}
</style>
