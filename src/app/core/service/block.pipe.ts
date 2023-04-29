import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'block',
})
export class BlockPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const re = new RegExp('lorem', 'gi');
    const match = value.match(re);
    if (!match) return value;
    return value.replace(re, '*****');
  }
}
