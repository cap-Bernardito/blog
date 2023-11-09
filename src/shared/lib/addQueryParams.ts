export function addQueryParams(params: [string, string | undefined][]) {
  const url = new URL(window.location.href);

  params.forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  window.history.pushState(null, "", url.toString());
}
