export class Character {
  name: string = "";
  height: string = "";
  mass: string = "";
  hair_color: string = "";
  skin_color: string = "";
  eye_color: string = "";
  birth_year: string = "";
  gender: string = "";
  homeworld: string = "";
  films: string[] = []; 
  species: string[] = []; 
  vehicles: string[] = []; 
  starships: string[] = []; 
  image: string ='';
  }
  
export class Space {
    name: string = "";
    persons: Array<Character> = []
}