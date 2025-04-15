import { defineStore } from 'pinia';
import axios from 'axios';
import type { Character } from '@/models/Character';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characters: [] as Character[],
    spaces: [] as { name: string; persons: Character[] }[],
    charactersLoaded: false,
  }),

  actions: {
    async fetchCharacters() {
      try {
        // Dicionário de imagens para personagens conhecidos
        const characterImages: Record<string, string> = {
          'Luke Skywalker': 'https://static.wikia.nocookie.net/starwars/images/9/9b/Luke-rotjpromo.jpg',
          'C-3PO': 'https://static.wikia.nocookie.net/starwars/images/5/5c/C-3PO_droid.png',
          'R2-D2': 'https://static.wikia.nocookie.net/starwars/images/3/39/R2-D2_Droid.png',
          'Darth Vader': 'https://static.wikia.nocookie.net/starwars/images/5/5c/Darth_Vader.jpg',
          'Leia Organa': 'https://static.wikia.nocookie.net/starwars/images/8/8f/Leia_Organa_TROS.png',
          'Owen Lars': 'https://static.wikia.nocookie.net/starwars/images/f/f4/OwenLars.jpg',
          'Beru Whitesun Lars': 'https://static.wikia.nocookie.net/starwars/images/1/1d/BeruCardTrader.png',
          'R5-D4': 'https://static.wikia.nocookie.net/starwars/images/d/de/R5-D4.jpg',
          'Biggs Darklighter': 'https://static.wikia.nocookie.net/starwars/images/e/e3/BiggsHS-ANH.png',
          'Obi-Wan Kenobi': 'https://static.wikia.nocookie.net/starwars/images/3/32/ObiWanHS-SWE.jpg',
          'Anakin Skywalker': 'https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png',
          'Yoda': 'https://static.wikia.nocookie.net/starwars/images/9/9b/Yoda_SWSB.png',
          'Palpatine': 'https://static.wikia.nocookie.net/starwars/images/c/c3/Palpatine-ROTS.png',
          'Chewbacca': 'https://static.wikia.nocookie.net/starwars/images/d/d4/Chewbacca_TLJ.png',
          'Han Solo': 'https://static.wikia.nocookie.net/starwars/images/e/e2/HanSolo.png',
          'Wilhuff Tarkin': 'https://static.wikia.nocookie.net/starwars/images/1/19/GrandMoffTarkin-SWI125.png',
          'Greedo': 'https://static.wikia.nocookie.net/starwars/images/4/42/Greedo.png',
          'Jabba Desilijic Tiure': 'https://static.wikia.nocookie.net/starwars/images/d/da/Jabba_the_Hutt_TPM.png',
          'Boba Fett': 'https://static.wikia.nocookie.net/starwars/images/e/eb/Boba_Fett.png',
          'Lando Calrissian': 'https://static.wikia.nocookie.net/starwars/images/d/d4/Lando_Calrissian_SWSB.png',
          'Nien Nunb': 'https://static.wikia.nocookie.net/starwars/images/c/c6/Nien_Nunb.png',
          'Bib Fortuna': 'https://static.wikia.nocookie.net/starwars/images/f/fb/Bib_Fortuna.png',
          'Max Rebo': 'https://static.wikia.nocookie.net/starwars/images/a/a1/Max_Rebo.png',
          'Jek Tono Porkins': 'https://static.wikia.nocookie.net/starwars/images/f/f1/Jek_Porkins.png',
          'Wedge Antilles': 'https://static.wikia.nocookie.net/starwars/images/a/a9/Wedge_Antilles_SWSB.png',
          'Poe Dameron': 'https://static.wikia.nocookie.net/starwars/images/0/0e/Poe_Dameron.png',
          'Finn': 'https://static.wikia.nocookie.net/starwars/images/a/a4/Finn.png',
          'Rose Tico': 'https://static.wikia.nocookie.net/starwars/images/9/9b/Rose_Tico.png',
          'DJ': 'https://static.wikia.nocookie.net/starwars/images/4/44/DJ.png',
          'General Hux': 'https://static.wikia.nocookie.net/starwars/images/2/2c/General_Hux_TFA.png',
          'Supreme Leader Snoke': 'https://static.wikia.nocookie.net/starwars/images/c/cf/Snoke.png',
          'Rae Sloane': 'https://static.wikia.nocookie.net/starwars/images/f/fd/Rae_Sloane.png',
          'Admiral Ackbar': 'https://static.wikia.nocookie.net/starwars/images/3/3f/AckbarSWSB.png',
          // Continue a adicionar mais personagens conforme necessário
        };

        // Imagem padrão para personagens sem imagem específica
        const defaultImage = 'https://static.wikia.nocookie.net/starwars/images/6/6f/Star_Wars_Logo.png';

        let url = 'https://swapi.py4e.com/api/people/';
        let allCharacters: Character[] = [];

        // Carregar todos os personagens da API
        while (url) {
          const res = await axios.get(url);
          const data = res.data;

          // Mapeando os personagens da SWAPI e atribuindo as imagens
          const characters = data.results.map((char: any) => {
            const imageUrl = characterImages[char.name] || defaultImage; // Atribuindo a imagem do personagem
            return {
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
              image: imageUrl,
            };
          });

          allCharacters.push(...characters); // Adicionando os personagens ao array total
          url = data.next; // Continuar para o próximo conjunto de resultados, se houver
        }

        this.spaces = [
          {
            name: 'Holocrons da Força',
            persons: allCharacters,
          },
        ];

        this.charactersLoaded = true;
      } catch (err) {
        console.error('Erro ao buscar personagens:', err);
      }
    },

    async loadCharacters() {
      if (!this.charactersLoaded) {
        await this.fetchCharacters();
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
