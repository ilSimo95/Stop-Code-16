import { Pipe, PipeTransform } from '@angular/core';
import { News } from './interfaces';

@Pipe({
  name: 'ricerca',
  pure: false
})
export class RicercaPipe implements PipeTransform {

  transform(value: News[], ...args: string[]): News[] {
    const keyword = args[0];
    return value.filter(articolo => {
      return (articolo.titolo.toLowerCase().includes(keyword) || articolo.descrizione.toLowerCase().includes(keyword))
    }
  )}

}
