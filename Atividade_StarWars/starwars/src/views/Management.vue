<script setup lang="ts">
import { Character } from '@/models/Character';
import { ref } from 'vue';
import axios from 'axios';
import CharacterComponent from '@/components/CharacterComponente.vue';

const searchInput = ref('');
const searchResult = ref<Character | null>(null);
const characters = ref<Character[]>([]); // Armazena localmente os personagens

const searchCharacter = async () => {
  const input = searchInput.value.trim();
  if (!input) return;

  try {
    let data;
    if (input.startsWith('/people/')) {
      const url = `https://swapi.py4e.com/api/${input}`;
      const res = await axios.get(url);
      data = res.data;
    } else {
      const res = await axios.get(`https://swapi.py4e.com/api/people/?search=${input}`);
      data = res.data.results[0];
      if (!data) {
        searchResult.value = null;
        return;
      }
    }

    const newChar: Character = {
      name: data.name,
      birth_year: data.birth_year,
      height: data.height,
      mass: data.mass,
      hair_color: data.hair_color,
      skin_color: data.skin_color,
      eye_color: data.eye_color,
      gender: data.gender,
      homeworld: data.homeworld,
      films: data.films,
      species: data.species,
      vehicles: data.vehicles,
      starships: data.starships,
      image:
        'https://static.wikia.nocookie.net/herois/images/1/12/Luke_Skywalker_Jedi_robe.webp/revision/latest?cb=20240317034233&path-prefix=pt-br',
    };

    searchResult.value = newChar;
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
  <main class="flex flex-column text-center justify-content-center align-items-center">
    <h1> Personagens Favoritos!</h1>

    <div class="form-box">
      <input v-model="searchInput" placeholder="Digite um nome ou /people/1/" />
      <button @click="searchCharacter">Buscar</button>
    </div>

    <div v-if="searchResult" class="preview-box">
      <CharacterComponent
        :character="searchResult"
        :id="999"
        :showButtons="false"
      />
      <button @click="addSearchedCharacter">Adicionar Personagem</button>
    </div>

    <section v-if="characters.length" class="spaces flex flex-wrap justify-content-center">
      <div v-for="(person, index) in characters" :key="index">
        <CharacterComponent
          :character="person"
          :id="index"
          :showButtons="true"
          @delete="deleteCharacter"
        />
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

  h1 {
    margin-bottom: 2rem;
    text-shadow: 1px 1px 4px black;
  }

  button {
    margin: 10px 0;
    padding: 10px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: #e53935;
  }

  .form-box, .preview-box {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;

    input {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
    }
  }

  .spaces {
    width: 90vw;
    min-height: 95vh;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 1rem;
    border-radius: 10px;
  }
}
</style>
