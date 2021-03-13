import { createAction, props } from '@ngrx/store';

export const crearItem = createAction(
    '[TODO] Crear item',
    props<{texto: string}>()
);

export const conmutador = createAction(
    '[TODO] Conmutador item',
    props<{id: number}>()
);

export const editarItem = createAction(
    '[TODO] Editar itemasdfasdfasdf',
    props<{id: number, texto: string }>()
);

export const borrarItem = createAction(
    '[TODO] Borrar item',
    props<{id: number}>()
);

export const cambiarTodos = createAction(
    '[TODO] Cambiar todos los items',
    props<{marcado: boolean}>()
);

export const limpiarCompletados = createAction(
    '[TODO] Limpiar items completados'
);