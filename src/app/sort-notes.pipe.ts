import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNotes'
})
export class SortNotes implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let newValue = value.slice(0);
      newValue.sort((l, r) => {
        if (l.position < r.position) return -1;
        if (l.position > r.position) return 1;
        return 0;
      });
      return newValue
    }
  }

}
