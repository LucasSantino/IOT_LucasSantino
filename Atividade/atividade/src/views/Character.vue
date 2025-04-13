<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';
import CharacterComponent from '@/components/CharacterComponente.vue';

const store = useCharacterStore();

</script>

<template>
  <main class="flex flex-column text-center justify-content-center align-items-center">
    <h1>Seus Personagens! 😎</h1>
    
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

  .spaces {
    width: 90vw;
    min-height: 95vh;
    background-color: rgb(73, 67, 67);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
