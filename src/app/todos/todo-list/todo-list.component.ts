import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todosLista: Todo[] = [];
  filtroActual: filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('todos').subscribe(todos => this.todosLista = todos );
    
    
    
    //Opción 1
    // this.store.subscribe( estado => {
    //   this.todosLista = estado.todos;
    //   this.filtroActual = estado.filtro;
    // })

    // Opción 2: usando la desestructuración
    this.store.subscribe( ({todos, filtro}) => {
      this.todosLista = todos;
      this.filtroActual = filtro;
    })
  }

}
