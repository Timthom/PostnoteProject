import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class Reverse implements PipeTransform {

  transform(value) {
    console.log('inne i pipen... value=' + value );
    return value.slice().reverse();
  }

}