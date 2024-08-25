import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../model/todo.model';

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: [] as Todo[] }),
  withMethods((state) => ({
    addAll(todos: Todo[]): void {
      patchState(state, { todos });
    },
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
);
