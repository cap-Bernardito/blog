export function addQueryParams(params: [string, string | undefined][]) {
  const url = new URL(window.location.href);

  params.forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });

  window.history.pushState(null, "", url.toString());
}
