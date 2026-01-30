export const goTo = (pathname, query = {}) => {
  const url = new URL(window.location);
  url.pathname = pathname;
  Object.keys(query).map((q) => url.searchParams.set(q, query[q]));
  window.location = url.toString();
};
