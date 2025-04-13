<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponente from '@/components/CharacterComponente.vue';
import { ref, computed } from 'vue'; // Importando 'computed'

// Acessa o store de personagens
const store = useCharacterStore();  

// Variáveis para controle de páginas
const currentPage = ref(1);
const itemsPerPage = 20; // Número total de cards por página

// Função para pegar os personagens da página atual
const paginatedCharacters = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = currentPage.value * itemsPerPage;
  return store.spaces[0]?.persons.slice(startIndex, endIndex); // Garantindo que 'spaces' e 'persons' estão definidos
});

// Funções para navegação entre as páginas
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

      <!-- Cards Wrapper -->
      <div class="cards-wrapper">
        <!-- Loop para renderizar os cards -->
        <div v-for="(person, index) in paginatedCharacters" :key="index" class="card-item">
          <CharacterComponente
            :character="person"
            :id="index"
            :showButtons="false"
          />
        </div>
      </div>

      <!-- Paginação -->
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
    width: 90vw;
    min-height: 95vh;
    background-color: rgba(0, 0, 0, 0.4); // Fundo escuro translúcido
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 1rem;
    border-radius: 10px;
  }

  h1 {
    margin-bottom: 2rem;
    text-shadow: 1px 1px 4px black;
  }

  h2 {
    color: #ffd700;
    text-shadow: 1px 1px 2px black;
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5 cards por linha */
    gap: 1rem; /* Espaçamento entre os cards */
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
      background-color: #f44336;
      color: white;
      padding: 0.3rem 0.7rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e53935;
      }

      &:disabled {
        background-color: #bdbdbd;
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
