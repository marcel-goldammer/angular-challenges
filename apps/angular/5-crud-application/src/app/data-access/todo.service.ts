import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        userId: todo.userId,
        title: randText(),
        completed: todo.completed,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todosfoo/${todo.id}`,
    );
  }
}
