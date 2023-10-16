import "@testing-library/jest-dom";

// https://github.com/facebook/create-react-app/blob/main/docusaurus/docs/running-tests.md#initializing-test-environment
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    count: () => Object.keys(store).length,
  };
})();

export type LocalStorageMock = typeof localStorageMock;

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});
