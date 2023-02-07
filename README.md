# alphacounter
An alphanumeric incrementable counter with endless scale and suitable for URLs. ~50 lines of code, no dependencies.
Can also convert from/to the numerical equivalent.

## Why?

alphacounter was created to provide sortable and URL-friendly strings for use in key-value database keys. With
zero-padded numbers you only have 10 usable characters. With alphacounter, you get 62, leading to much smaller keys.
See below how many keys you can get with a given padded length.

This is valuable for auto-incrementing database string ids that could be used in URLs.

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
  counter = inc(counter); // 2, 3, ..., 8, 9, A, B, ..., y, z, 00, 01, 02, ..., F8, F9
}
```

### Comparing 2 counters without padding

A helper allows comparing two counters, taking into account their string length so that 10 remains greater than 9,
even though it would sort differently as strings. It also handles an undefined/null value as a new counter, less
than any other counter.

```js
import { inc } from 'alphacounter';

let counter = inc('F8'); // becomes F9

// Compare two counters
console.log(inc.is(counter).gt('A')); // true
console.log(inc.is(counter).gt('00A')); // false

console.log(inc.is(undefined).lt('0')); // true
```

### With Padding

A second parameter, `pad`, will zero-pad the counter for use in database indexes. Since databases can't use our gt/lt
helper, you may need to zero-pad the string to the max you think you will need. To determine the upper limit, use
61^n - 1 where n is the pad length. These are some ranges for quick reference:
| Padding | Max Count           |       |
| ------: | :------------------ | :---- |
|       2 | 3,720               |   ~4k |
|       3 | 226,980             | ~225k |
|       4 | 13,845,840          |  ~14M |
|       6 | 51,520,374,360      |  ~51B |
|       8 | 191,707,312,997,280 | ~200T |

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
inc.from(1000) // F8

inc.to('1') // 1
inc.to('F8') // 1000

// With padding (note: counters with padding are not equal to those without)

inc.from(1, 4) // 0001
inc.from(1000, 4) // 00G8

inc.to('1') // 1
inc.to('F8') // 938
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
