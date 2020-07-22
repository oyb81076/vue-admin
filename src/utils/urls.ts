type QueryValue = string | number | Date | boolean | null;
export type Queries = Record<string, QueryValue | QueryValue[]>;
export function injectURLQuery(
  url: string,
  queries?: Queries,
) {
  if (!queries) { return url; }
  const params = serializeParams(queries);
  if (params.length === 0) { return url; }
  let next = url;
  if (next.includes('?')) {
    if (!next.endsWith('&')) {
      next += '&';
    }
  } else {
    next += '?';
  }
  next += params.join('&');
  return next;
}
export function serializeParams(queries: Queries): string[] {
  const params: string[] = [];
  Object.keys(queries).forEach((key) => {
    const escapeKey = encodeURIComponent(key);
    const value = queries[key];
    if (Array.isArray(value)) {
      value.forEach((val) => {
        params.push(`${escapeKey}=${encodeURIComponent(stringify(val))}`);
      });
    } else if (value != null) {
      params.push(`${escapeKey}=${encodeURIComponent(stringify(value))}`);
    }
  });
  return params;
}
function stringify(val: QueryValue): string {
  if (val instanceof Date) {
    return val.toISOString();
  }
  return String(val);
}
