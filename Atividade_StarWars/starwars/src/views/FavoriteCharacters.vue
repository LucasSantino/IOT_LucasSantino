<script setup lang="ts">
import { ref } from 'vue';
import type { Character } from '@/models/Character';
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponent from '@/components/CharacterComponente.vue';

const searchInput = ref('');
const searchResult = ref<Character | null>(null);
const characters = ref<Character[]>([]);
const characterStore = useCharacterStore();

characterStore.loadCharacters(); // Carrega os personagens armazenados na pasta store

const searchCharacter = async () => {
  const input = searchInput.value.trim();
  if (!input) return;

  try {
    // Busca no array local de personagens do store
    const allCharacters = characterStore.spaces[0]?.persons || [];
    
    let foundCharacter: Character | undefined;
    
    if (/^\d+$/.test(input)) {
      // Busca por ID da SWAPI 
      const id = parseInt(input);
      foundCharacter = allCharacters.find((_, index) => index + 1 === id);
    } else {
      // Busca por nome do personagem
      foundCharacter = allCharacters.find(char => 
        char.name.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (!foundCharacter) {
      searchResult.value = null;
      return;
    }

    searchResult.value = { ...foundCharacter };
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    searchResult.value = null;
  }
};

const addSearchedCharacter = () => {
  if (searchResult.value) {
    characters.value.push(searchResult.value);
    searchResult.value = null;
    searchInput.value = '';
  }
};

const deleteCharacter = (index: number) => {
  characters.value.splice(index, 1);
};
</script>

<template>
  <main>
    <header class="top-bar">
      <h1>Personagens Favoritos!</h1>
      <div class="form-box">
        <input v-model="searchInput" placeholder="Digite um nome ou ID" />
        <button @click="searchCharacter">Buscar</button>
      </div>
    </header>
    <section v-if="searchResult" class="preview-container"> <!-- Preview do personagem  -->
      <CharacterComponent
        :character="searchResult"
        :id="999"
        :showButtons="false"
      />
      <button @click="addSearchedCharacter">Adicionar Personagem</button>
    </section>
    <section v-if="characters.length" class="characters-container"><!-- personagens adicionados -->
      <div class="card-grid">
        <div
          v-for="(person, index) in characters"
          :key="index"
          class="card-wrapper"
        >
          <CharacterComponent
            :character="person"
            :id="index"
            :showButtons="true"
            @delete="deleteCharacter"
          />
        </div>
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.top-bar {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
    text-shadow: 1px 1px 4px black;
  }

  .form-box {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;

    input {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      width: 300px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #eead2d;
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background-color: #eead2d;
    }
  }
}

.preview-container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  text-align: center;

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #eead2d;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color: #eead2d;
  }
}

.characters-container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  min-height: 40vh;
  margin-bottom: 2rem;

  .card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); // manipulação dos cards por colunas
  gap: 1rem;
  justify-items: center;
}


.card-wrapper {
  width: 250px;
  margin: 0.5rem;
}

}
</style>
