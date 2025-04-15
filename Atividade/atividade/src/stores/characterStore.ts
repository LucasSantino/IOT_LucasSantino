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
          'Luke Skywalker': 'https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg',
          'C-3PO': 'https://upload.wikimedia.org/wikipedia/pt/6/66/C-3PO.jpg',
          'R2-D2': 'https://upload.wikimedia.org/wikipedia/pt/3/39/R2-D2_Droid.png',
          'Darth Vader': 'https://i.pinimg.com/564x/51/e3/7c/51e37c2b688170cdc07888eba287bfd1.jpg',
          'Leia Organa': 'https://upload.wikimedia.org/wikipedia/pt/thumb/e/e9/Carrie_Fisher_como_Princesa_Leia.jpg/260px-Carrie_Fisher_como_Princesa_Leia.jpg',
          'Owen Lars': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRVF6IjPfHoJMwgO_Qn2DH5LolGTOQ7Aunsg&s',
          'Beru Whitesun Lars': 'https://static.wikia.nocookie.net/starwars/images/1/1d/BeruCardTrader.png',
          'R5-D4': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpSPwfVMI6vguGPI750fSu1e9xZvj1phFkILoFrU4xtUUnsTmb1X1tuQ_xDmFtxeMG1E&usqp=CAU',
          'Biggs Darklighter': 'https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=0%2C0%2C1560%2C878',
          'Obi-Wan Kenobi': 'https://jpimg.com.br/uploads/2020/01/obiwan-e1585919300283.png',
          'Anakin Skywalker': 'https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png',
          'Yoda': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Yoda_Attack_of_the_Clones.png/250px-Yoda_Attack_of_the_Clones.png',
          'Palpatine': 'https://i0.wp.com/popoca.com.br/wp-content/uploads/2023/09/Star-Wars-Palpatine.png?resize=1155%2C770&ssl=1',
          'Chewbacca': 'https://lumiere-a.akamaihd.net/v1/images/5e94826f7d7499000120d564-image_f9b9d30e.jpeg?region=336%2C0%2C864%2C864',
          'Han Solo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0hjH7aRNn5H_QnOC_oKxrGjONmUTD5obQCdBoMd_dVDlBoe9CwTa_I_JXpP3tSl8ONKs&usqp=CAU',
          'Wilhuff Tarkin': 'https://i.namu.wiki/i/O-ZHhG8R2e4EeHMYZJ2Dy5as8mKuE71IqGJ46fMEOKfPjras6jfRVwg1ZFy6o6n-5eDZqqEFPzerf7e4vfrH6A.webp',
          'Greedo': 'https://i.pinimg.com/736x/04/a2/91/04a29124e43754f01282d7fd28549440.jpg',
          'Jabba Desilijic Tiure': 'https://upload.wikimedia.org/wikipedia/en/5/53/Jabba_the_Hutt_in_Return_of_the_Jedi_%281983%29.png',
          'Boba Fett': 'https://static.wikia.nocookie.net/starwars/images/e/eb/Boba_Fett.png',
          'Lando Calrissian': 'https://static.wikia.nocookie.net/starwars/images/d/d4/Lando_Calrissian_SWSB.png',
          'Nien Nunb': 'https://static.wikia.nocookie.net/starwars/images/c/c6/Nien_Nunb.png',
          'Bib Fortuna': 'https://static.wikia.nocookie.net/starwars/images/f/fb/Bib_Fortuna.png',
          'Max Rebo': 'https://static.wikia.nocookie.net/starwars/images/a/a1/Max_Rebo.png',
          'Jek Tono Porkins': 'https://preview.redd.it/kfvbjz2ootu41.jpg?auto=webp&s=f40bac57d6f282722ad7899a538ab96fd0ce0dbb',
          'Wedge Antilles': 'https://ovicio.com.br/wp-content/uploads/wedge2.jpg',
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
