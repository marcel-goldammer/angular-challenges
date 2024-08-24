import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingStore {
  #loading = signal(false);

  get loading() {
    return this.#loading.asReadonly();
  }

  start() {
    this.#loading.set(true);
  }

  stop() {
    this.#loading.set(false);
  }
}
