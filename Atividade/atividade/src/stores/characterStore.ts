import { defineStore } from 'pinia';
import axios from 'axios';
import type { Character } from '@/models/Character';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characters: [] as Character[],
    spaces: [] as { name: string; persons: Character[] }[], // 👈 Adicionado
  }),

  actions: {
  async fetchCharacters() {
    try {
      const res = await axios.get('https://swapi.dev/api/people/');
      const characters = res.data.results.map((char: any) => ({
        name: char.name,
        birth_year: char.birth_year,
        height: char.height,
        mass: char.mass,
        image: 'https://static.wikia.nocookie.net/herois/images/1/12/Luke_Skywalker_Jedi_robe.webp/revision/latest?cb=20240317034233&path-prefix=pt-br'
      }));
  
      this.spaces = [
        {
          name: '',
          persons: characters,
        },
      ];
    } catch (err) {
      console.error('Erro ao buscar personagens:', err);
    }
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
