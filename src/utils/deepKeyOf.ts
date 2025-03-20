export type DeepKeys<T, Prefix extends string = ''> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${Prefix}${K}` | DeepKeys<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & (string | number)];

export default function deepKeyOf<T>(obj: T): DeepKeys<T> {
  return obj as DeepKeys<T>;
}
