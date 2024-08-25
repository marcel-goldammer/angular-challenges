import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './component/todo-item.component';
import { TodoService } from './data-access/todo.service';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @if (loading()) {
      <mat-spinner />
    }
    @for (todo of todos(); track todo.id) {
      <app-todo-item [todo]="todo" />
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private todoService = inject(TodoService);
  private store = inject(TodoStore);

  todos = this.store.todos;
  loading = this.store.loading;

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
