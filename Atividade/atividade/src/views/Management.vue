<script setup lang="ts">
import { Character, Space } from '@/models/Character';
import { reactive, ref, onMounted } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponent from '@/components/CharacterComponente.vue';

const store = useCharacterStore();
const newPerson = reactive(new Character());
const showForm = ref(false);

onMounted(async () => {
  await store.fetchCharacters();
});

const addCharacter = () => {
  if (newPerson.name && newPerson.birth_year && newPerson.height) {
    const newChar = reactive(new Character());
    Object.assign(newChar, newPerson);
    newChar.image = "person";

    store.addCharacterToSpace(0, newChar);

    newPerson.name = '';
    newPerson.birth_year = '';
    newPerson.height = '';
    newPerson.mass = '';
  }
};

const deleteCharacter = (index: number) => {
  store.removeCharacterFromSpace(0, index);
};
</script>

<template>
  <main class="flex flex-column text-center justify-content-center align-items-center">
    <h1>Gerenciamento de Personagens! </h1>

    <button @click="showForm = !showForm">
      <span class="material-icons"></span> Adicionar Personagem
    </button>

    <div v-if="showForm" class="form-box">
      <input v-model="newPerson.name" placeholder="Nome" />
      <input v-model="newPerson.birth_year" placeholder="Idade" type="number" />
      <input v-model="newPerson.height" placeholder="Altura" type="number" step="0.01" />
      <input v-model="newPerson.mass" placeholder="Peso" type="number" />
      <button @click="addCharacter">Adicionar Personagem</button>
    </div>

    <section class="spaces flex flex-wrap justify-content-center">
      <div v-for="(person, index) in store.spaces[0]?.persons" :key="index">
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

  .form-box {
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
