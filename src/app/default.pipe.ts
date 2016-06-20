import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'default'
})
export class Default implements PipeTransform {

    transform(value, args) {
        if ((value == null || value == "") && args.length) {
            return (args);
        } else {
            return (value);
        }
    }

}