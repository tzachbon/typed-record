import type { Key, Value } from './types';

export type TypedRecordData = Record<Key, unknown>;

/**
 * The TypedRecord object holds key (Symbol) - value pairs.
 * The key is used to retrieve the value and holds the type of the value.
 */
export class TypedRecord {
  constructor(private record: TypedRecordData = {}) {}

  /**
   *
   * To get your typed value from the record you need to create a key (Symbol) that holds the type of the value.
   *
   * @param name - description of the key
   * @returns a typed symbol that can be used to access the value
   * @example
   *
   * const key = TypedRecord.key<{ hello: 'world' }>('test');
   *
   */
  static key<T>(name: string) {
    return Symbol(name) as Key<T>;
  }

  /**
   * Set a typed value in the record
   *
   * @param key - A string that represent the symbol name or the key (Symbol) that holds the type of the value
   * @param value - the value to set
   * @returns returns the key that is used to retrieve the value
   *
   * @example
   *
   * const typedRecord = new TypedRecord();
   * const myKey = typedRecord.set('my-key', { hello: 'world' });
   *
   * type MyKey = typeof myKey; // The key to retrieve the data.
   *
   */
  set<K extends Key>(key: K, value: Value<K>): K;
  set<V>(key: string, value: V): Key<V>;
  set<V, K extends Key<V>>(key: K | string, value: Value<K>): K {
    if (typeof key === 'string') {
      key = TypedRecord.key(key) as K;
    }

    this.record[key] = value;

    return key;
  }

  /**
   *
   * The get method returns the value associated with the specified key.
   *
   * @param key - the key (Symbol) that holds the type of the value
   * @returns the typed value or undefined if it doesn't exist
   *
   * @example
   *
   * const typedRecord = new TypedRecord();
   * const myKey = typedRecord.set('my-key', { hello: 'world' });
   *
   * const value = typedRecord.get(myKey); // The type would be "{ hello: 'world' }"
   */
  get<K extends Key>(key: K): Value<K> | undefined {
    return this.record[key];
  }

  /**
   * The has method returns a boolean indicating whether an element with the specified key exists or not.
   *
   * @param key - the key (Symbol) that holds the type of the value
   * @returns returns true if the record contains the specified key
   *
   * @example
   *
   * const typedRecord = new TypedRecord();
   *
   * const myKey = typedRecord.set('my-key', { hello: 'world' });
   *
   * typedRecord.has(myKey); // true
   * typedRecord.has(TypedRecord.key('does-not-exist-key')); // false
   *
   */
  has<K extends Key>(key: K): boolean {
    return key in this.record;
  }

  /**
   * The delete method removes the specified element from the TypedRecord by key.
   *
   * @param key - the key (Symbol) that holds the type of the value
   * @returns returns true if the record contained the specified element
   */
  delete<K extends Key>(key: K): boolean {
    if (this.has(key)) {
      delete this.record[key];
      return true;
    } else {
      return false;
    }
  }

  /**
   * The clear method removes all elements from a record object.
   */
  clear() {
    this.record = {};
  }
}
