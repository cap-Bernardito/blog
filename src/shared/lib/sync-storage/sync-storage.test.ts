import { LocalStorageMock } from "../../../../config/jest/jest-setup";

import { SyncStorage } from "./sync-storage";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const localStorageStub = localStorage as LocalStorageMock;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sessionStorageStub = sessionStorage as LocalStorageMock;

describe("SyncStorage - localStorage", () => {
  beforeEach(() => {
    localStorageStub.clear();
    sessionStorageStub.clear();
  });

  it("should save the string", () => {
    const key = "foo";
    const value = "bar";
    const storage = new SyncStorage().create("local");

    storage.add(key, value);

    expect(localStorageStub.setItem.mock.calls).toHaveLength(1);
    expect(localStorageStub.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should save the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    const storage = new SyncStorage().create("local");

    storage.add(key, value);

    expect(localStorageStub.setItem.mock.calls).toHaveLength(1);
    expect(localStorageStub.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should get the string", () => {
    const key = "foo";
    const value = "bar";
    localStorageStub.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("local");

    expect(storage.get(key)).toEqual(value);
  });

  it("should get the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    localStorageStub.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("local");

    expect(storage.get(key)).toEqual(value);
  });

  it("should remove key", () => {
    const key = "foo";
    const value = "bar";
    localStorageStub.setItem(key, JSON.stringify(value));

    expect(localStorageStub.count()).toBe(1);
    const storage = new SyncStorage().create("local");
    storage.remove(key);

    expect(localStorageStub.count()).toBe(0);
  });
});

describe("SyncStorage - sessionStorage", () => {
  it("should save the string", () => {
    const key = "foo";
    const value = "bar";
    const storage = new SyncStorage().create("session");

    storage.add(key, value);

    expect(sessionStorageStub.setItem.mock.calls).toHaveLength(1);
    expect(sessionStorageStub.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should save the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    const storage = new SyncStorage().create("session");

    storage.add(key, value);

    expect(sessionStorageStub.setItem.mock.calls).toHaveLength(1);
    expect(sessionStorageStub.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should get the string", () => {
    const key = "foo";
    const value = "bar";
    sessionStorageStub.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("session");

    expect(storage.get(key)).toEqual(value);
  });

  it("should get the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    sessionStorageStub.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("session");

    expect(storage.get(key)).toEqual(value);
  });

  it("should remove key", () => {
    const key = "foo";
    const value = "bar";
    sessionStorageStub.setItem(key, JSON.stringify(value));

    expect(sessionStorageStub.count()).toBe(1);
    const storage = new SyncStorage().create("session");
    storage.remove(key);

    expect(sessionStorageStub.count()).toBe(0);
  });
});
