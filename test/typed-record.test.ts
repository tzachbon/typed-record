import expect from 'expect';
import { expectType } from 'ts-expect';
import { TypedRecord, Key } from 'typed-record';

describe('TypedRecord', () => {
  it('should create a Key', () => {
    type ExpectedValueType = 'value';

    const key = TypedRecord.key<ExpectedValueType>('test');

    expect(typeof key).toBe('symbol');
    expectType<Key<ExpectedValueType>>(key);
  });
});
