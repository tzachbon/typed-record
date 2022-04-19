const type = Symbol();
export type Key<T = unknown> = symbol & { [type]: T };
export type Value<K extends Key> = K[typeof type];
