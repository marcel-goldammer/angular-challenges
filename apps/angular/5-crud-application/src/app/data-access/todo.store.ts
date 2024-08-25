import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoService } from './todo.service';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initalState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  withMethods((state, todoService = inject(TodoService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap(() => todoService.getTodos()),
        tapResponse({
          next: (todos) => patchState(state, { todos, loading: false }),
          error: () =>
            patchState(state, {
              error: 'Error loading all todos.',
              loading: false,
            }),
        }),
      ),
    ),
    update(todo: Todo): void {
      patchState(state, () => ({
        todos: state.todos().map((t) => (t.id === todo.id ? todo : t)),
      }));
    },
    delete(todo: Todo): void {
      patchState(state, () => ({
        todos: state.todos().filter((t) => t.id !== todo.id),
      }));
    },
  })),
  withHooks({
    onInit: (store) => store.loadAll(),
  }),
);
