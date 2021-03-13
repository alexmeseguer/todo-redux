import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actionsF from '../../filtro/filtro.actions';
import { filtrosValidos } from '../../filtro/filtro.actions';
import * as actionsT from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actionsF.filtrosValidos = 'todos';
  filtros: actionsF.filtrosValidos[] = ['todos','completados','pendientes'];

  pendientes: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => 
    //   this.filtroActual = filtro
    // );

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( item => !item.completado ).length;
    });
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(actionsF.setFiltro({filtro}));
  }

  limpiarCompletados() {
    this.store.dispatch(actionsT.limpiarCompletados());
  }

}
