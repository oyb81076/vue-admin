export default function errorToString(e: unknown): string {
  if (typeof e === 'string') { return e; }
  if (e instanceof Error) { return e.message; }
  try {
    return JSON.stringify(e);
  } catch {
    return `non stringify error: ${String(e)}`;
  }
}
