export class Note {
  //Antar att man får ett id från firebase sedan?
  id: string;
  
  //Kommer tillkomma andra variabler...
  
  constructor(private title: string, private text: string){
      console.log("inne i note.ts konstruktor");
  }
}