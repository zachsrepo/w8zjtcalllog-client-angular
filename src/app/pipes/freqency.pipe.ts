import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freqency'
})
export class FreqencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
