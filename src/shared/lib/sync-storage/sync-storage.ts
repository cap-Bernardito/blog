import LocalStoragesAdapter from "./local-storages-adapter";
import MemoryAdapter from "./memory-adapter";
import { StorageType } from "./types";

export class SyncStorage {
  static #instance: SyncStorage;

  constructor() {
    if (SyncStorage.#instance) {
      return SyncStorage.#instance;
    }

    SyncStorage.#instance = this;
  }

  create(storageType: StorageType = "local", prefix = "") {
    const storages = {
      local: () => new LocalStoragesAdapter(prefix, window.localStorage),
      session: () => new LocalStoragesAdapter(prefix, window.sessionStorage),
      memory: () => new MemoryAdapter(),
    };

    const getStorage = storages[storageType];

    return getStorage();
  }
}
