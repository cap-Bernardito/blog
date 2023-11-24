import { StorageAdapter } from "./types";

export default class MemoryAdapter implements StorageAdapter {
  static #instance: MemoryAdapter;
  #storage = new Map();

  constructor() {
    if (MemoryAdapter.#instance) {
      return MemoryAdapter.#instance;
    }

    MemoryAdapter.#instance = this;
  }

  add(key: string, value: unknown): void {
    this.#storage.set(key, value);
  }

  get(key: string): unknown | null {
    return this.#storage.get(key);
  }

  remove(key: string): void {
    this.#storage.delete(key);
  }

  getAll(): Record<string, unknown> {
    return Object.fromEntries(this.#storage.entries());
  }

  removeAll(): void {
    for (const key of this.#storage.keys()) {
      this.#storage.delete(key);
    }
  }
}
