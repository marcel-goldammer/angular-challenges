import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingStore } from './data-access/loading.store';
import { TodoService } from './data-access/todo.service';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loadingStore.loading()) {
      <mat-progress-spinner mode="indeterminate" />
    }
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private store = inject(TodoStore);

  loadingStore = inject(LoadingStore);
  todos = this.store.todos;

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.store.addAll(todos);
    });
  }

  update(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((updated: Todo) => {
      this.store.update(updated);
    });
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.store.delete(todo);
    });
  }
}
