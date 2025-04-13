<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponent from '@/components/CharacterComponente.vue';

const store = useCharacterStore();
</script>

<template>
  <main class="flex flex-column text-center justify-content-center align-items-center">
    <h1>Personagens: Star Wars!</h1>
    
    <section class="spaces flex flex-wrap justify-content-center">
      <div v-for="(person, index) in store.spaces[0]?.persons" :key="index">
        <h2>{{ store.spaces[0]?.name }}</h2>
        <CharacterComponent
          :character="person"
          :id="index"
          :showButtons="false"
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

  .spaces {
    width: 90vw;
    min-height: 95vh;
    background-color: rgba(0, 0, 0, 0.4); // fundo escuro translúcido
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
}
</style>
