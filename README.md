# alphacounter
 An alphanumeric incrementable counter with endless scale and suitable for URLs. ~45 lines of code, no dependencies.

## Why?

This was created to limit the number of characters in a counter and allow the counter to go beyond the range
of JavaScript precision. You can get to 9 quadrillion before losing precision in JavaScript, and if you JSON encoding
the values, numbers will take less (or equal) space up to 100k because a JSON string has 2 additional characters (the
quote marks). For example, 1002 is represented as F9, which is the same character size in JSON encoded as "F9", making
both it and 1002 4 characters long JSON encoded.

This may be valuable for auto-incrementing database string ids that could be used in URLs. And it could be useful for
extremely large numbers. Also support 0-padding for sorting in a DB index.

## Why another?

There are a few alphanumeric incrementing libraries available, but they are implemented poorly, don't produce
sortable strings, and are larger than they need to be. incstr, alphaplusplus, & alpha-inc all use the wrong alphabet
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

### With Padding

A helper allows comparing two counters, taking into account their string length so that 10 remains greater than 9.
It also handles an undefined/null value as a new counter, less than any other counter.

```js
import { inc } from 'alphacounter';

let counter = inc('F8'); // F9

// Compare two counters
console.log(inc.is(counter).gt('A')); // true
console.log(inc.is(counter).gt('00A')); // false
console.log(inc.is(undefined).lt('0')); // true
```

### With Padding

A second parameter, `pad`, will zero-pad the counter for use in database indexes. Since databases can't use our gt/lt
helper, you may need to zero-pad the string to the max you think you will need. To determine the upper limit, use
61^n - 1 where n is the pad length. These are some ranges:
| Padding | Max Count           |
| ------: | :------------------ |
|       2 | 3,720               |
|       3 | 226,980             |
|       4 | 13,845,840          |
|       6 | 51,520,374,360      |
|       8 | 191,707,312,997,280 |

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
