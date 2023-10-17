import { LocalStorage, SessionStorage, StorageAdapter } from "./types";

export default class LocalStoragesAdapter implements StorageAdapter {
  #storage;

  constructor(
    protected prefix: string = "",
    storage: LocalStorage | SessionStorage,
  ) {
    const border = ":";

    this.prefix = prefix ? `${prefix}${border}` : "";

    this.#storage = storage;
  }

  add(key: string, value: unknown): void {
    return this.#storage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  get(key: string): unknown {
    const value = this.#storage.getItem(`${this.prefix}${key}`);

    if (!value) {
      return null;
    }

    let result = null;

    try {
      result = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }

    return result;
  }

  remove(key: string): void {
    this.#storage.removeItem(`${this.prefix}${key}`);
  }

  getAll(): Record<string, unknown> {
    const keys = Object.keys(this.#storage);
    const serviceKeys = keys.filter((item) => item.startsWith(`${this.prefix}`));

    return serviceKeys.reduce((accum: { [key: string]: unknown }, fullKey) => {
      const key = fullKey.replace(`${this.prefix}`, "");

      accum[key] = this.get(key);

      return accum;
    }, {});
  }

  removeAll() {
    const serviceKeys = Object.keys(this.getAll());

    serviceKeys.forEach((key) => {
      this.remove(key);
    });
  }
}
