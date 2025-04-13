export class Character {
    name: string ="";
    height: string="";
    mass: string ="";
    birth_year: string ="";
    image: string ='';
  }
  
export class Space {
    name: string = "";
    persons: Array<Character> = []
}