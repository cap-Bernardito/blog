import SyncStorage from "./sync-storage";

describe("SyncStorage - localStorage", () => {
  it("should save the string", () => {
    const key = "foo";
    const value = "bar";
    const storage = new SyncStorage().create("local");

    storage.add(key, value);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value));
    expect(localStorage.__STORE__[key]).toBe(JSON.stringify(value));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it("should save the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    const storage = new SyncStorage().create("local");

    storage.add(key, value);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value));
    expect(localStorage.__STORE__[key]).toBe(JSON.stringify(value));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it("should get the string", () => {
    const key = "foo";
    const value = "bar";
    localStorage.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("local");

    expect(storage.get(key)).toEqual(value);
  });

  it("should get the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    localStorage.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("local");

    expect(storage.get(key)).toEqual(value);
  });

  it("should remove key", () => {
    const key = "foo";
    const value = "bar";
    localStorage.setItem(key, JSON.stringify(value));

    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    const storage = new SyncStorage().create("local");
    storage.remove(key);

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });

  it("should get all keys", () => {
    const key1 = "foo";
    const key2 = "baz";
    const value = "bar";
    localStorage.setItem(key1, JSON.stringify(value));
    localStorage.setItem(key2, JSON.stringify(value));

    expect(Object.keys(localStorage.__STORE__).length).toBe(2);
    const storage = new SyncStorage().create("local");

    expect(storage.getAll()).toEqual({ [key1]: value, [key2]: value });
  });

  it("should remove all keys", () => {
    const key1 = "foo";
    const key2 = "baz";
    const value = "bar";
    localStorage.setItem(key1, JSON.stringify(value));
    localStorage.setItem(key2, JSON.stringify(value));

    expect(Object.keys(localStorage.__STORE__).length).toBe(2);
    const storage = new SyncStorage().create("local");
    storage.removeAll();

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});

describe("SyncStorage - sessionStorage", () => {
  it("should save the string", () => {
    const key = "foo";
    const value = "bar";
    const storage = new SyncStorage().create("session");

    storage.add(key, value);

    expect(sessionStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value));
    expect(sessionStorage.__STORE__[key]).toBe(JSON.stringify(value));
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
  });

  it("should save the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    const storage = new SyncStorage().create("session");

    storage.add(key, value);

    expect(sessionStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value));
    expect(sessionStorage.__STORE__[key]).toBe(JSON.stringify(value));
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
  });

  it("should get the string", () => {
    const key = "foo";
    const value = "bar";
    sessionStorage.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("session");

    expect(storage.get(key)).toEqual(value);
  });

  it("should get the object", () => {
    const key = "foo";
    const value = { bar: "baz" };
    sessionStorage.setItem(key, JSON.stringify(value));

    const storage = new SyncStorage().create("session");

    expect(storage.get(key)).toEqual(value);
  });

  it("should remove key", () => {
    const key = "foo";
    const value = "bar";
    sessionStorage.setItem(key, JSON.stringify(value));

    expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
    const storage = new SyncStorage().create("session");
    storage.remove(key);

    expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);
  });

  it("should get all keys", () => {
    const key1 = "foo";
    const key2 = "baz";
    const value = "bar";
    sessionStorage.setItem(key1, JSON.stringify(value));
    sessionStorage.setItem(key2, JSON.stringify(value));

    expect(Object.keys(sessionStorage.__STORE__).length).toBe(2);
    const storage = new SyncStorage().create("session");

    expect(storage.getAll()).toEqual({ [key1]: value, [key2]: value });
  });

  it("should remove all keys", () => {
    const key1 = "foo";
    const key2 = "baz";
    const value = "bar";
    sessionStorage.setItem(key1, JSON.stringify(value));
    sessionStorage.setItem(key2, JSON.stringify(value));

    expect(Object.keys(sessionStorage.__STORE__).length).toBe(2);
    const storage = new SyncStorage().create("session");
    storage.removeAll();

    expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);
  });
});
