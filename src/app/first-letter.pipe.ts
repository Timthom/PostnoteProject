import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetter implements PipeTransform {

  transform(value: string): string {
    if(value){
      console.log(value.charAt(0));
      return value.charAt(0);
    }
    return null;
  }

}
