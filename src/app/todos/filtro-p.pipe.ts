import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../filtro/filtro.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtroP'
})
export class FiltroPPipe implements PipeTransform {

  transform(items: Todo[], filtro: filtrosValidos): Todo[] {
    console.log(filtro);
    switch (filtro) {
      case 'completados':
        return items.filter(filtrado => filtrado.completado);
      case 'pendientes':
        return items.filter(filtrado => !filtrado.completado);
      default:
        return items;
    }
  }

}
