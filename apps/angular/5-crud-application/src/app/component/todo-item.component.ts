import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemStore } from '../data-access/todo-item.store';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [MatProgressSpinnerModule],
  template: `
    <div>
      {{ title() }}
      <button (click)="update()" [disabled]="loading()">Update</button>
      <button (click)="delete()" [disabled]="loading()">Delete</button>
      @if (loading()) {
        <mat-spinner diameter="16" />
      }
      @if (error()) {
        <span class="error">{{ error() }}</span>
      }
    </div>
  `,
  styles: [
    `
      .error {
        color: tomato;
      }
      mat-spinner {
        display: inline-block;
        height: 1em;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoItemStore],
})
export class TodoItemComponent {
  private store = inject(TodoItemStore);

  todo = input.required<Todo>();
  title = computed(() => this.todo().title);
  loading = this.store.loading;
  error = this.store.error;

  update(): void {
    this.store.update(this.todo());
  }

  delete(): void {
    this.store.delete(this.todo());
  }
}
