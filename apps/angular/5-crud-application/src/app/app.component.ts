import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TodoService } from './data-access/todo.service';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private store = inject(TodoStore);

  todos = this.store.todos;

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.store.addAll(todos);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((updated: Todo) => {
      this.store.update(updated);
    });
  }
}
