const enums: Record<string, string> = {
  l: 'YYYY-MM-DD',
  ll: 'YYYY-MM-DD HH:mm',
  lll: 'YYYY-MM-DD HH:mm:ss',
  llll: 'YYYY-MM-DD HH:mm:ss.SSS',
  L: 'YYYY年MM月DD日',
  Ll: 'YYYY年MM月DD日 HH:mm',
  LL: 'YYYY年MM月DD日 HH时mm分',
  LLL: 'YYYY年MM月DD日 HH时mm分ss秒',
};
export function parseDate(v: string | number | Date): Date {
  if (v instanceof Date) { return v; }
  return new Date(v);
}
export function formatDate(v: Date, fmt: string) {
  const str = enums[fmt] || fmt;
  const obj: Array<[string, string]> = [
    ['YYYY', v.getFullYear().toString()],
    ['MM', num2(v.getMonth() + 1)],
    ['DD', num2(v.getDate())],
    ['HH', num2(v.getHours())],
    ['mm', num2(v.getMinutes())],
    ['ss', num2(v.getSeconds())],
    ['SSS', num3(v.getMilliseconds())],
  ];
  return obj.reduce((prev, [key, value]) => prev.replace(key, value), str);
}
function num2(v: number): string {
  if (v >= 10) { return v.toString(); }
  return `0${v}`;
}
function num3(v: number): string {
  if (v >= 100) { return v.toString(); }
  if (v >= 10) { return `0${v}`; }
  return `00${v}`;
}
