export type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};

export type PrependToUnion<
  U extends string,
  T extends string
> = U extends unknown ? `${T}-${U}` : never;
