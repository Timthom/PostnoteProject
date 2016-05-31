export class Note {
  
  constructor(private title: string, private text: string, private group: string, private $key: string, private color: string){
      console.log("inne i note.ts konstruktor");
  }
}