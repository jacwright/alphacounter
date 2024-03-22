# alphacounter
An alphanumeric incrementable counter with endless scale and suitable for URLs. ~40 lines of code, no dependencies.
Can also convert from/to the numerical equivalent.

## Why?

alphacounter was created to provide sortable and URL-friendly strings for use in key-value database keys. With
zero-padded numbers you only have 10 usable characters. With alphacounter, you get 62, leading to much smaller keys.
See below how many keys you can get with a given padded length.

This is valuable for auto-incrementing database string ids that could be used in URLs. It may be useful for extremely
large numbers. It can reduce hexidecimal hash size (e.g. make a 32-length md5 hash 22 chars). Also supports zero-padding
for sorting in a DB index. It works great with key-value stores that are key-sorted.

## Why another?

There are a few alphanumeric incrementing libraries available, but they are implemented poorly, don't produce
_sortable_ strings, and are larger than they need to be. incstr, alphaplusplus, & alpha-inc all use the wrong alphabet
order so you can't check if one counter is larger than another.

## Usage

A single function, `inc`, handles creating and incrementing your counter from 0 to beyond `Number.MAX_SAFE_INTEGER`.

```js
import { inc } from 'alphacounter';

let counter = inc(); // 0
counter = inc(counter); // 1

for (let i = 0; i < 1000; i++) {
  counter = inc(counter); // 2, 3, ..., 8, 9, A, B, ..., y, z, 00, 01, 02, ..., K8, K9
}
```

### Comparing 2 Counters

A helper allows comparing two counters, taking into account their string length so that 10 remains greater than 9,
even though it would sort differently as strings. It also handles an undefined/null value as a new counter, less
than any other counter.

```js
import { inc } from 'alphacounter';

let counter = inc('F8'); // becomes F9

// Compare two counters
console.log(inc.is(counter).gt('A')); // true
console.log(inc.is(counter).gt('00A')); // true
console.log(inc.is(counter).eq('000F9')); // true
console.log(inc.is(undefined).lt('0')); // true
```

### With Padding

A second parameter, `pad`, will zero-pad the counter for use in database indexes. Since databases can't use our gt/lt
helper, you may need to zero-pad the string to the max you think you will need. To determine the upper limit, use
62^n where n is the string length. These are some ranges:
| Str Len | Max Count/Number    |       |
| ------: | :------------------ | :---- |
|       2 | 3,844               |   ~4K |
|       3 | 238,328             | ~238K |
|       4 | 14,776,336          |  ~15M |
|       5 | 916,132,832         |   ~1B |
|       6 | 56,800,235,584      |  ~57B |
|       8 | 218,340,105,584,896 | ~218T |
|      10 | 8.39299365868340e17 | ~839P |

(P is short for Petabyte or Quadrillion)

```js
import { inc } from 'alphacounter';

let counter = inc(null, 3); // 000
counter = inc(counter, 5); // 00001
counter = inc(counter, 2); // 00002 (won't remove characters, allowing to grow beyond the padding)

// Padded for sorting in a database index with 6 characters, allowing for up to 61^6 ids (51 billion)
counter = inc(null, 6); // 000000
counter = inc(counter, 6); // 000001
counter = inc(counter); // 000002 (after already being padded, the argument won't be needed and is optional)

for (let i = 0; i < 999; i++) {
  counter = inc(counter); // 0000F9
}
```

### Convert

If you have to convert between a numerical counter and alphacounter you can use these helpers.

```js
import { inc } from 'alphacounter';

inc.from(1) // 1
inc.from(1000) // G8

inc.to('1') // 1
inc.to('G8') // 1000

// With padding

inc.from(1, 4) // 0001
inc.from(1000, 4) // 00G8

inc.to('0001') // 1
inc.to('00G8') // 1000
```

### Invert

You may want to store records in your database in reverse order with the newest appearing at the top of your results. To
accomplish this, you may use invert with padded counters.

```js
import { inc } from 'alphacounter';

const id = inc('', 4) // 0000
inc.invert(id); // zzzz

saveDocument(`reverseIndex/${inc.invert('00F9')}`, { id: '00F9', ... }); // zzkq
```

### Decrement

You may want reverse a counter.

```js
import { inc } from 'alphacounter';

const id = inc('5', 4) // 0006
inc.dec(id); // 0005
```
