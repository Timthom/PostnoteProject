import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class Reverse implements PipeTransform {

  transform(value) {
    if (value) {
      console.log('inne i pipen... value= ' + value );
      return value.slice().reverse();
    } else {
      console.log('value = '+value);
    }

  }

}