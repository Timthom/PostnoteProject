import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNotes'
})
export class SortNotes implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      // console.log('inne i sortNotes value: ');
      // console.log(value);
      let newValue = value.slice(0);
      newValue.sort((l,r) => {
        if (l.position < r.position) return -1;
        if (l.position > r.position) return 1;
        return 0;
      });
      // console.log('efter sortBy: ');
      // console.log(newValue);
      
      return newValue
    }
  }

}
