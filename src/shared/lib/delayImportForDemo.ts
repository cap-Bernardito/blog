import { ComponentType } from "react";

export function delayImportForDemo<
  T extends Record<string, ComponentType<P>>,
  K extends keyof T,
  P = Record<string, never>,
>(promise: Promise<T>, moduleName: K) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  })
    .then(() => promise)
    .then((module) => {
      return { default: module[moduleName] };
    });
}
