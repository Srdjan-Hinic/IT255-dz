import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bedPipe'})
export class BedPipePipe implements PipeTransform {
  transform(value1: any[], value2: number): any[] {
    return !!value2 ? value1.filter(x => x.beds >= value2) : value1;
  }
}
