export function addQueryParams(params: [string, string][]) {
  const url = new URL(window.location.href);

  params.forEach(([key, value]) => url.searchParams.set(key, value));

  window.history.pushState(null, "", url.toString());
}
