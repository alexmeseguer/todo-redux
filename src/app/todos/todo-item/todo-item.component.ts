import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';
import { editarItem, borrarItem } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item: Todo;
  @ViewChild('inputFisico', {static: false}) txtInputFisico: ElementRef;

  checkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.item.completado);
    this.txtInput = new FormControl(this.item.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe( () => {
      this.store.dispatch(actions.conmutador({id: this.item.id}));
    });
  }

  edita() {
    this.editando = true;
    this.txtInput.setValue(this.item.texto);
    setTimeout(
      ()=> {
        this.txtInputFisico.nativeElement.select();
      }, 2);
  }

  terminarEdicion() {
    this.editando = false;
    if(this.txtInput.invalid) return;
    if(this.txtInput.value === this.item.texto) return;
    this.store.dispatch(actions.editarItem({
      id: this.item.id,
      texto: this.txtInput.value
    }))
  }

  borrarItem() {
    this.store.dispatch(actions.borrarItem({id: this.item.id}));
  }

}
