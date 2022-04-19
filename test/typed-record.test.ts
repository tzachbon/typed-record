import expect from 'expect';
import { expectType } from 'ts-expect';
import { TypedRecord, Key } from 'typed-record';

describe('TypedRecord', () => {
  let typedRecord: TypedRecord;

  beforeEach(() => {
    typedRecord = new TypedRecord();
  });

  it('should create a Key', () => {
    type ExpectedValueType = 'value';

    const key = TypedRecord.key<ExpectedValueType>('test');

    expect(typeof key).toBe('symbol');
    expectType<Key<ExpectedValueType>>(key);
  });

  it('should create key automatically when setting a value', () => {
    const key = typedRecord.set('my-key', { hello: 'world' });

    expect(typeof key).toBe('symbol');
    expectType<Key<{ hello: string }>>(key);

    expect(typedRecord.get(key)).toEqual({ hello: 'world' });
    expectType<{ hello: string } | undefined>(typedRecord.get(key));
  });

  it('should use manually created key when setting a value', () => {
    const key = TypedRecord.key<{ hello: string }>('my-key');

    expect(key).toEqual(typedRecord.set(key, { hello: 'world' }));
    expect(typedRecord.get(key)).toEqual({ hello: 'world' });
  });

  it('should return undefined when getting a key that was not used', () => {
    const key = TypedRecord.key<{ hello: string }>('my-key');

    expect(typedRecord.get(key)).toBeUndefined();
  });

  it('should override value from the same key', () => {
    const key = typedRecord.set('my-key', { hello: 'world' });

    expect(typedRecord.get(key)).toEqual({ hello: 'world' });

    typedRecord.set(key, { hello: 'world2' });

    expect(typedRecord.get(key)).toEqual({ hello: 'world2' });
  });

  it('should check if has a given key', () => {
    const exist = typedRecord.set('exist', { hello: 'world' });
    const notExist = TypedRecord.key('not-exist');

    expect(typedRecord.has(exist)).toEqual(true);
    expect(typedRecord.has(notExist)).toEqual(false);
  });

  it('should delete a given key', () => {
    const key = typedRecord.set('my-key', { hello: 'world' });

    expect(typedRecord.delete(key)).toEqual(true);
    expect(typedRecord.has(key)).toEqual(false);
    expect(typedRecord.delete(key)).toEqual(false);
  });

  it('should clear all keys', () => {
    const first = typedRecord.set('first', 1);
    const second = typedRecord.set('second', 'hey');

    typedRecord.clear();

    expect(typedRecord.has(first)).toEqual(false);
    expect(typedRecord.has(second)).toEqual(false);
  });
});
