<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponente from '@/components/CharacterComponente.vue';
import { ref, computed, onMounted } from 'vue';

const store = useCharacterStore();

onMounted(async () => {
  await store.loadCharacters();
});

const currentPage = ref(1);
const itemsPerPage = 20;

const paginatedCharacters = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = currentPage.value * itemsPerPage;
  return store.spaces[0]?.persons.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < store.spaces[0]?.persons.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <main class="flex flex-column text-center justify-content-center align-items-center">
    <h1>Personagens: Star Wars!</h1>
    <section class="spaces flex flex-column align-items-center">
      <h2>{{ store.spaces[0]?.name }}</h2>
      <div class="cards-wrapper">
        <div v-for="(person, index) in paginatedCharacters" :key="index" class="card-item">
          <CharacterComponente
            :character="person"
            :id="index"
            :showButtons="false"
          />
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >= store.spaces[0]?.persons.length">Próximo</button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100vw;
  min-height: 100vh;
  background-image: url('@/images/starwars_wallpaper.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem;
  color: white;

  .spaces {
    width: 92vw;
    min-height: 95vh;
    background-color: rgba(0, 0, 0, 0.45);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 3rem 2rem;
    border-radius: 10px;
  }

  h1 {
    margin-bottom: 3rem;
    text-shadow: 1px 1px 4px black;
    color:#ffd700
  }

  h2 {
    color: #ffd700;
    text-shadow: 1px 1px 2px black;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr); // 5 por linha
    gap: 0.6rem; // menor espaçamento
    width: 100%;
    margin-bottom: 2rem;
  }

  .card-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    button {
      background-color: #eead2d;
      color: white;
      padding: 0.3rem 0.7rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #eead2d;
      }

      &:disabled {
        background-color: #eead2d;
        cursor: not-allowed;
      }
    }

    span {
      font-size: 1.2rem;
      color: white;
    }
  }
}
</style>
