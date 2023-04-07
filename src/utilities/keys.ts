export function keys<T extends Record<string, unknown>>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
}
