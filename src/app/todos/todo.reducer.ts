import { createReducer, on } from '@ngrx/store';
import { crearItem, conmutador, editarItem, borrarItem, cambiarTodos, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Ejemplo de ToDo'),
  new Todo('Ejemplo de ToDo22'),
  new Todo('Ejemplo de ToDo1')
];

const _crearReducer = createReducer(
  estadoInicial,
  on(crearItem, (state, { texto }) => [...state, new Todo(texto)]),
  
  on(conmutador, (state, { id }) => {
    return state.map( todo => {
      
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(editarItem, (state, { id, texto }) => {
    return state.map( todo => {
      
      if(todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(borrarItem, (state, { id }) => state.filter( todo => todo.id !== id )),
  on(cambiarTodos, (state, { marcado }) => {
    return state.map( todo => {
      return {
        ...todo,
        completado: marcado
      }
    });
  }),
  on(limpiarCompletados, state => state.filter( todo => !todo.completado))

);
// El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

 /* La función crearItem:Al ser un arreglo debemos prevenir la mutución del obtejo, y por tanto
   * no podemos usar el push, entonces el estado actal lo traemos desestructurado
   * de ahí los ...state, y después le añadimos el nuevo objeto tipo Todo con el texto introducido
   * por el usuario. por eso en lugar de un push el nuevo estado será un arreglo de los anteriores 
   * TODO desesctructurados más uno nuevo (new Todo).
   * Para objetos tipo JSON pasaría lo mismo ((¿?))
   */

export function crearReducer(state, action) {
  return _crearReducer(state, action);
}
