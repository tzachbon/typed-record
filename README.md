# TypedRecord

[![Build Status](https://github.com/tzachbon/typed-record/workflows/tests/badge.svg)](https://github.com/tzachbon/typed-record/actions)

A type-safe record with 0 dependencies.\
Aren't you sick of creating a `Record` or `Map` without strictly knowing the type of the values?

For example:
```ts
const record: Record<string, number | string | undefined> = {
    thisIsANumber: 5
};

// Much Later in your code.....
let iWouldLikeToBeOfTypeNumber = record.thisIsANumber // The type would be "string | number | undefined" unfortunately...


//// It's even worse with Maps

const myMap = new Map();

myMap.set('thisIsANumber', 5)

iWouldLikeToBeOfTypeNumber = myMap.get('thisIsANumber') // What?? You should not get any... If there was a solution?
```

So you can chill out and just use `TypedRecord` instead.

```ts
import { TypedRecord } from 'typed-record';

const typedRecord = new TypedRecord();
const myKey = typedRecord.set('aNameForTheKey', 5);

const aNumber = typedRecord.get(myKey) // The type is "number"!!!
```
Simple as that.

### When you should use it

I would only recommend using this pattern when you have a "pluggable" (when you compose stuff) flow where the main flow does fully aware of the type of the values.
This pattern will give you the advantaged of dynamic pluggable typings and communication between the plug-ins.

- I call it plug-in but you can name it whatever you like, component, feature etc...

## Installation

```bash
npm i typed-record
```

or

```bash
yarn add typed-record
```

## Usage

### `set`

Set a typed value in the record

@param `key` - A string that represent the symbol name or the key (Symbol) that holds the type of the value

@param `value` - the value to set

@returns returns the key that is used to retrieve the value

```ts
const typedRecord = new TypedRecord();
// The key is created for you automatically
const myKey = typedRecord.set('my-key', { hello: 'world' });

// Manually creating the key
const manuallyCreatedKey = TypedRecord.key<number>('a-key');
typedRecord.set(manuallyCreatedKey, 69);
```

### `get`

The get method returns the value associated with the specified key

@param `key` - the key (Symbol) that holds the type of the value

@returns the typed value or undefined if it doesn't exist

```ts
const typedRecord = new TypedRecord();
const myKey = typedRecord.set('my-key', { hello: 'world' });

const value = typedRecord.get(myKey); // The type would be "{ hello: 'world' }"
```

### `has`

The has method returns a boolean indicating whether an element with the specified key exists or not.

@param `key` - the key (Symbol) that holds the type of the value

@returns returns true if the record contains the specified key

```ts
const typedRecord = new TypedRecord();

const myKey = typedRecord.set('my-key', { hello: 'world' });

typedRecord.has(myKey); // true
typedRecord.has(TypedRecord.key('does-not-exist-key')); // false

```

### `delete`

The delete method removes the specified element from the TypedRecord by key.

@param `key` - the key (Symbol) that holds the type of the value

@returns returns true if the record contained the specified element

```ts
const typedRecord = new TypedRecord();

const myKey = typedRecord.set('my-key', { hello: 'world' });

typedRecord.delete(myKey); // true
typedRecord.delete(TypedRecord.key('does-not-exist-key')); // false

```

### `clear`

The clear method removes all elements from a record object.

### Creating a key Manually

To get your typed value from the record you need to create a key (Symbol) that holds the type of the value.

@param `name` - description of the key

@returns return a typed symbol that can be used to access the value

```ts

const key = TypedRecord.key<{ hello: 'world' }>('test');

```

## License

[MIT](./LICENSE)

## Contributing

Feel free to fork and create pull requests!

## Important note

Special thanks to my colleagues at [Stylable](https://stylable.io/) for the knowledge sharing.
