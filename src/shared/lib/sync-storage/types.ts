export type StorageAdapter = {
  add(key: string, value: string): void;

  get(key: string): unknown;

  remove(key: string): void;

  getAll(): Record<string, unknown>;

  removeAll(): void;
};

export type LocalStorage = typeof window.localStorage;

export type SessionStorage = typeof window.sessionStorage;

export type StorageType = "local" | "session" | "memory";
