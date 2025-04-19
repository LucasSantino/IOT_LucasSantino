<script setup lang="ts">
import { Character } from '@/models/Character';
import { ref } from 'vue';

const props = defineProps({
  character: { type: Object as () => Character, required: true },
  showInfo: { type: Boolean, default: true },
  showButtons: { type: Boolean, default: true },
});

const emit = defineEmits(['delete']);
const flipped = ref(false);

const toggleFlip = () => {
  flipped.value = !flipped.value;
};

const handleDelete = () => {
  emit('delete');
};
</script>

<template>
  <section class="card" @click="toggleFlip">
    <div class="card-inner" :class="{ flipped: flipped }">
      <div class="card-front">
        <img
          v-if="props.character.image"
          :src="props.character.image"
          :alt="props.character.name"
          class="character-image"
        />
        <h5>{{ props.character.name }}</h5>
      </div>
      <div class="card-back">
        <p><strong>Altura:</strong> {{ props.character.height }}</p>
        <p><strong>Peso:</strong> {{ props.character.mass }}</p>
        <p><strong>Cor do cabelo:</strong> {{ props.character.hair_color }}</p>
        <p><strong>Cor da pele:</strong> {{ props.character.skin_color }}</p>
        <p><strong>Cor dos olhos:</strong> {{ props.character.eye_color }}</p>
        <p><strong>Ano de nascimento:</strong> {{ props.character.birth_year }}</p>
        <p><strong>Gênero:</strong> {{ props.character.gender }}</p>
        <p><strong>Planeta natal:</strong> {{ props.character.homeworld }}</p>
        <p><strong>Espécies:</strong> {{ props.character.species.join(', ') }}</p>
        <p><strong>Veículos:</strong> {{ props.character.vehicles.join(', ') }}</p>
        <p><strong>Naves:</strong> {{ props.character.starships.join(', ') }}</p>
        <p><strong>Filmes:</strong> {{ props.character.films.join(', ') }}</p>
      </div>
    </div>
    <div class="delete-btn" v-if="props.showButtons" @click.stop="handleDelete">
      <span class="material-icons">delete</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card {
  perspective: 1000px;
  width: 100%;
  max-width: 300px;
  height: 500px;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
  }
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  backface-visibility: hidden;
  border: 1px solid #555;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  color: #f0f0f0;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
}

.card-front {
  z-index: 2;
  background-color: rgba(46, 46, 46, 0.85);
}

.card-back {
  transform: rotateY(180deg);
  background-color: #2e2e2e;
  text-align: left;
  font-size: 0.85rem;
  line-height: 1.2rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.1rem;
  }
}

.character-image {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    aspect-ratio: 2 / 3;
  }
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 20px; 
  transform: scale(1.05); 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

h5 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.delete-btn {
  margin-top: 0.5rem;
  cursor: pointer;
  color: #f44336;

  .material-icons {
    font-size: 1.5rem;
  }

  &:hover {
    color: #e53935;
  }
}
</style>

