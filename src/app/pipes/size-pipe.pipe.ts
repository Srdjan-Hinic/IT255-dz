import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sizePipe' })
export class SizePipePipe implements PipeTransform {
  transform(value1: any[], value2: number): any[] {
    return !!value2 ? value1.filter(x => x.size >= value2) : value1;
  }
}
