import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const LoadingStore = signalStore(
  { providedIn: 'root' },
  withState({ loading: false }),
  withMethods((state) => ({
    start(): void {
      patchState(state, { loading: true });
    },
    stop(): void {
      patchState(state, { loading: false });
    },
  })),
);
