import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';

type TodoItemState = {
  loading: boolean;
  error: string | null;
};

const initialState: TodoItemState = {
  loading: false,
  error: null,
};

export const TodoItemStore = signalStore(
  withState(initialState),
  withMethods(
    (
      state,
      todoService = inject(TodoService),
      todoStore = inject(TodoStore),
    ) => ({
      update: rxMethod<Todo>(
        pipe(
          tap(() => patchState(state, { loading: true, error: null })),
          switchMap((todo) => todoService.updateTodo(todo)),
          tapResponse({
            next: (todo) => {
              todoStore.update(todo);
              patchState(state, { loading: false });
            },
            error: () => {
              patchState(state, {
                error: 'Error updating todo.',
                loading: false,
              });
            },
          }),
        ),
      ),
      delete: rxMethod<Todo>(
        pipe(
          tap(() => patchState(state, { loading: true, error: null })),
          switchMap((todo) =>
            todoService.deleteTodo(todo).pipe(
              tapResponse({
                next: () => {
                  todoStore.delete(todo);
                  patchState(state, { loading: false });
                },
                error: () => {
                  patchState(state, {
                    error: 'Error deleting todo.',
                    loading: false,
                  });
                },
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
