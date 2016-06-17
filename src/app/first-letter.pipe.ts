import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetter implements PipeTransform {

  transform(value: any): any {
    if(value){
      return value.charAt(0);
    }
    return null;
  }

}
