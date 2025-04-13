import { defineStore } from 'pinia';
import axios from 'axios';
import type { Character } from '@/models/Character';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characters: [] as Character[],
    spaces: [] as { name: string; persons: Character[] }[],
  }),

  actions: {
    // ✅ Mantido para uso interno
    async fetchCharacters() {
      try {
        let url = 'https://swapi.dev/api/people/';
        let allCharacters: Character[] = [];

        while (url) {
          const res = await axios.get(url);
          const data = res.data;

          const characters = data.results.map((char: any) => ({
            name: char.name,
            birth_year: char.birth_year,
            height: char.height,
            mass: char.mass,
            hair_color: char.hair_color,
            skin_color: char.skin_color,
            eye_color: char.eye_color,
            gender: char.gender,
            homeworld: char.homeworld,
            films: char.films,
            species: char.species,
            vehicles: char.vehicles,
            starships: char.starships,
            image:
              'https://static.wikia.nocookie.net/herois/images/1/12/Luke_Skywalker_Jedi_robe.webp/revision/latest?cb=20240317034233&path-prefix=pt-br',
          }));

          allCharacters.push(...characters);
          url = data.next;
        }

        this.spaces = [
          {
            name: 'Holocrons da Força',
            persons: allCharacters,
          },
        ];
      } catch (err) {
        console.error('Erro ao buscar personagens:', err);
      }
    },

    // ✅ Alias para funcionar com Character.vue
    async loadCharacters() {
      await this.fetchCharacters();
    },

    setSpaces(spaces: { name: string; persons: Character[] }[]) {
      this.spaces = spaces;
    },

    addCharacterToSpace(spaceIndex: number, character: Character) {
      this.spaces[spaceIndex]?.persons.push(character);
    },

    removeCharacterFromSpace(spaceIndex: number, characterIndex: number) {
      this.spaces[spaceIndex]?.persons.splice(characterIndex, 1);
    },
  },
});
