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
        // Dicionário de imagens usando links pesquisados no google
        const characterImages: Record<string, string> = {
          'Luke Skywalker': 'https://i0.wp.com/ovicio.com.br/wp-content/uploads/2023/02/20230217-fpkgftxxoaevuoe-1.jpg?resize=555%2C555&ssl=1',
          'C-3PO': 'https://upload.wikimedia.org/wikipedia/pt/6/66/C-3PO.jpg',
          'R2-D2': 'https://upload.wikimedia.org/wikipedia/pt/3/39/R2-D2_Droid.png',
          'Darth Vader': 'https://i.pinimg.com/564x/51/e3/7c/51e37c2b688170cdc07888eba287bfd1.jpg',
          'Leia Organa': 'https://upload.wikimedia.org/wikipedia/pt/thumb/e/e9/Carrie_Fisher_como_Princesa_Leia.jpg/260px-Carrie_Fisher_como_Princesa_Leia.jpg',
          'Owen Lars': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRVF6IjPfHoJMwgO_Qn2DH5LolGTOQ7Aunsg&s',
          'Beru Whitesun lars': 'https://clonecorridor.com/wp-content/uploads/2015/09/beru-lars-6.jpg', 
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
          'Boba Fett': 'https://upload.wikimedia.org/wikipedia/commons/7/70/DJA_7971_%289359695765%29.jpg',
          'Lando Calrissian': 'https://bamfstyle.com/wp-content/uploads/2019/05/lando-main1.jpg',
          'Nien Nunb': 'https://i.pinimg.com/736x/8c/43/c6/8c43c6ebb32f47a22dc4b3c9eb39a7ef.jpg',
          'Bib Fortuna': 'https://upload.wikimedia.org/wikipedia/en/6/65/Bib_Fortuna_%28screenshot%29.jpg',
          'Jek Tono Porkins': 'https://preview.redd.it/kfvbjz2ootu41.jpg?auto=webp&s=f40bac57d6f282722ad7899a538ab96fd0ce0dbb',
          'Wedge Antilles': 'https://ovicio.com.br/wp-content/uploads/wedge2.jpg',
          'Poe Dameron': 'https://upload.wikimedia.org/wikipedia/en/0/0b/Poe_Dameron-Force_Awakens_%282015%29.png',
          'Finn': 'https://upload.wikimedia.org/wikipedia/pt/2/2a/Finn-Force_Awakens_%282015%29.png',
          'IG-88': 'https://i.redd.it/what-was-exactly-the-difference-between-ig-88-and-ig-11-and-v0-6d3x6naan7p81.jpg?width=593&format=pjpg&auto=webp&s=3d75591aea5b960fdc35cb7f77c5f388f7948cbd',
          'Bossk': 'https://cdn.mos.cms.futurecdn.net/Rea6HFTioS7n6Xd2VwGbQH.jpg',
          'Lobot':'https://rebellegion.com/wp-content/uploads/2015/02/lobot-01.jpg',
          'Ackbar':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlmpAej8rrZNRvrnQCaj7bZJs6VuHp4jgXag&s',
          'Mon Mothma':'https://lumiere-a.akamaihd.net/v1/images/image_6bc73efa.jpeg?region=336,0,864,864',
          'Arvel Crynyd':'https://lh6.googleusercontent.com/proxy/OgwkqSyzbdSvlSC3lr_k5k0Q2I3PEzwQ0RyCoacNgfw7PhabJHdQyO6KF68cUnaSchzmPUrcFxRT__sanJr0MsURNOjV8_hnugVe8C-mOqcsHZdDhyPeNRU',
          'Wicket Systri Warrick':'https://lumiere-a.akamaihd.net/v1/images/image_31630371.jpeg?height=354&region=0%2C0%2C1920%2C814&width=630',
          'Qui-Gon Jinn':'https://i.pinimg.com/564x/65/a7/fe/65a7fe526f46b834845674bd8226870a.jpg',
          'Nute Gunray':'https://lumiere-a.akamaihd.net/v1/images/databank_nutegunray_01_169_9d66ded2.jpeg?region=195%2C0%2C1171%2C878',
          'Finis Valorum':'https://i.pinimg.com/474x/29/16/62/29166227119bf6376119c9d89c3d88c7.jpg',
          'Padmé Amidala': 'https://i.pinimg.com/736x/cb/ea/3a/cbea3a2f54a95820d82ae94b3498dd2d.jpg',
          'Jar Jar Binks':'https://upload.wikimedia.org/wikipedia/en/4/4b/Jjportrait.jpg',
          'Roos Tarpals':'https://pm1.aminoapps.com/6523/a8bc71d716a5152825f26d0781619ee3df5d63e0_00.jpg',
          'Rugor Nass':'https://www.starwarsnewsnet.com/wp-content/uploads/2025/02/BossNass_laugh.webp',
          'Ric Olié':'https://assets.mycast.io/actor_images/actor-ralph-brown-481594_large.jpg?1657656218',
          'Watto':'https://upload.wikimedia.org/wikipedia/en/c/c1/Watto_EPI_TPM.png',
          'Sebulba':'https://pm1.aminoapps.com/6032/56e285f7bd6329d65f58e80020239d5b023ad04c_00.jpg',
          'Quarsh Panaka':'https://preview.redd.it/or6zgjrj88a81.jpg?auto=webp&s=b256acef11c5a04b982649035ded2de4745735f6',
          'Shmi Skywalker':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQs0GAhFV3B1fhP0z6aOYkAr_e-ddrG3Wo6w&s',
          'Darth Maul':'https://www.lasdaoalplay.com/wp-content/uploads/2015/03/Darth_Maul.jpg',
          'Ayla Secura':'https://cdn.shopify.com/s/files/1/0883/1929/5779/files/9a8c0b254c67e2c32b5094de899c2d3e--secura-star-wars-characters_480x480.webp?v=1731408662',
          'Ratts Tyerel':'https://rpggamer.org/uploaded_images/RattsHS.jpg',
          'Dud Bolt':'https://starwarsreadingorder.com/images/characters/dud_bolt_2.jpg',
          'Gasgano':'https://lh6.googleusercontent.com/proxy/QxELyN4at4VP4zKei9uCuWeBSrhZP3YMzGL2z3PkjCZgsRLcLmfK503GLQlXCwfSEW_ExF7TOY-uGdg3rVNU8ndIn9uhm7p8t2cZkYwIyeAfSDtqOFEfRypaTkN9NvG9YeDrDlio-JsGEQ',
          'Ben Quadinaros':'https://lumiere-a.akamaihd.net/v1/images/databank_benquadinaros_01_169_0c77b6a0.jpeg?region=372%2C0%2C876%2C878',
          'Mace Windu':'https://saberspro.com/cdn/shop/articles/windu2.webp?v=1712925757&width=2048',
          'Ki-Adi-Mundi':'https://rollingstone.uol.com.br/media/uploads/b7cc70fb3da28a1c60aaf465b2cf1f91558fa3e3_00.jpg',
          'Kit Fisto':'https://www.sideshow.com/storage/product-images/904939/kit-fisto_star-wars_square.jpg',
          'Eeth Koth':'https://neosabers.com/cdn/shop/articles/eeth_koth_1ec7103a-3c35-4208-9559-8db3fce25bb4.webp?v=1730802458&width=900',
          'Adi Gallia':'https://comicvine.gamespot.com/a/uploads/scale_small/0/5904/205431-29575-adi-gallia.jpg',
          'Saesee Tiin':'https://i.pinimg.com/736x/e6/37/d3/e637d3e2bb0400ceac248cc8a5bdfc39.jpg',
          'Yarael Poof':'https://comicvine.gamespot.com/a/uploads/original/11115/111155790/4607457-1584546605-yarae.jpg',
          'Plo Koon':'https://cdn.shopify.com/s/files/1/0883/1929/5779/files/image-8.png',
          'Mas Amedda':'https://i.pinimg.com/564x/02/d7/32/02d73237c3285c83dbcb2d978f80ad36.jpg',
          'Gregar Typho':'https://www.starwars-universe.com/images/encyclopedie/personnages/avatars_v6/typhoava.jpg',
          'Cordé':'https://i.pinimg.com/236x/12/bb/b5/12bbb5a3d41010e611d23c81d03937d4.jpg',
          'Cliegg Lars':'https://static.tvtropes.org/pmwiki/pub/images/cliegg_lars_sw.png',
          'Poggle the Lesser':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutvchdJPOgc0pudcAi3lId3Dl_iUVPuPOlw&s',
          'Luminara Unduli':'https://pm1.aminoapps.com/6009/4cb5476655a5b6e1a89e38017839351ffd143b51_00.jpg',
          'Barriss Offee':'https://preview.redd.it/nalini-krishan-as-barriss-offee-star-wars-v0-nyd5opy24dwd1.jpg?width=640&crop=smart&auto=webp&s=05465cf400f43cf7318b5d62132d6965511878c4',
          'Dormé':'https://i.pinimg.com/564x/b3/ab/fd/b3abfd216b1c344116f996cc7e3b3fa4.jpg',
          'Dooku':'https://nsabers.com/cdn/shop/articles/opolar_A_super_realistic_portrait_of_Count_Dooku_holding_his__03930bf7-faf8-4df1-9460-12443868a309_3.png?v=1722335702',
          'Bail Prestor Organa':'https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/a/ad/Bail_organa_bio_pic.jpeg',
          'Jango Fett':'https://lumiere-a.akamaihd.net/v1/images/databank_jangofett_01_169_884cefab.jpeg?region=0%2C0%2C1560%2C878',
          'Zam Wesell':'https://lumiere-a.akamaihd.net/v1/images/zam-wesell_bbaffe9f.jpeg?region=309%2C0%2C666%2C664',
          'Dexter Jettster':'https://i.pinimg.com/736x/5b/81/20/5b8120170c7682e13a63194d9858cb95.jpg',
          'Lama Su':'https://lumiere-a.akamaihd.net/v1/images/kaminoan-main-image_8f582a48.jpeg?region=282%2C0%2C661%2C663',
          'Taun We':'https://rpggamer.org/uploaded_images/TaunWeKaminoan.jpg',
          'Jocasta Nu':'https://i.pinimg.com/736x/60/ab/37/60ab37de4cd9afe737ced53a4017f68a.jpg',
          'R4-P17':'https://i.pinimg.com/474x/eb/dc/70/ebdc70861babd02b3699d1f954fe5642.jpg',
          'Wat Tambor':'https://pm1.aminoapps.com/6957/34fe7444f189da1e6094eaae9fb919304649e3b8r1-322-260v2_00.jpg',
          'San Hill':'https://www.starwars-holonet.com/holonet/dictionnaire/photos/perso_hill_san.jpg',
          'Shaak Ti':'https://64.media.tumblr.com/ef451367ee498f7fc508225133a97b66/tumblr_nj5jctIuSs1tg9gcwo1_250sq.jpg',
          'Grievous':'https://upload.wikimedia.org/wikipedia/en/5/54/General_Grievous.png',
          'Tarfful':'https://rebellegion.com/wp-content/uploads/2014/02/tarfful2.jpg',
          'Raymus Antilles':'https://i.pinimg.com/564x/ea/d1/25/ead1250106b60318cf6276934e6b70a7.jpg',
          'Sly Moore':'https://pm1.aminoapps.com/6087/7a053912d29058cf3b4375517b0020fd6c41dd05_hq.jpg',
          'Tion Medon':'https://i.redd.it/j3ox8no9moj61.jpg',
          'Rey':'https://wallpapers.com/images/high/star-wars-pictures-zdw3ij6dd1jticgg.webp',
          'BB8':'https://lumiere-a.akamaihd.net/v1/images/bb-8-main_72775463.jpeg?region=353%2C38%2C498%2C498',
          'Captain Phasma':'https://upload.wikimedia.org/wikipedia/en/f/fc/Captain_Phasma.png',
          
        };

        // Imagem se o personagem não tiver
        const defaultImage = 'https://static.wikia.nocookie.net/starwars/images/6/6f/Star_Wars_Logo.png';

        let url = 'https://swapi.py4e.com/api/people/';
        let allCharacters: Character[] = [];

        // Carrega todos os personagens da API
        while (url) {
          const res = await axios.get(url);
          const data = res.data;

          // Mapeando os personagens da SWAPI e colocando as imagens
          const characters = data.results.map((char: any) => {
            const imageUrl = characterImages[char.name] || defaultImage; 
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
          url = data.next; 
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
