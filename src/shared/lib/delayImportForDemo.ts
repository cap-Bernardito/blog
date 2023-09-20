// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function delayImportForDemo(promise, moduleName) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  })
    .then(() => promise)
    .then((module) => ({ default: module[moduleName] }));
}
