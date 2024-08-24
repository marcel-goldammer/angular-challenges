import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  todos = signal<Todo[]>([]);

  addAll(todos: Todo[]) {
    this.todos.set(todos);
  }

  update(todo: Todo) {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === todo.id ? todo : t)),
    );
  }
}
