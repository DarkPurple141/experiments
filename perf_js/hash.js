
const assert = require('assert');

function HashMap() {
   /* can result in collisions */
   function hash (string) {
     return string
       .split('')
       .reduce((a, b) => ((a << 5) + a) + b.charCodeAt(0), 5381)
   }

   let array = []

   return {
      has(key) {
         return array[hash(key)] ? true : false
      },
      set(key, val) {
         array[hash(key)] = val
      },
      get(key) {
         return array[hash(key)]
      }
   }
}

let map = new HashMap()

assert(map.set('abc', 123)      == undefined)
assert(map.set('foo', 'bar')    == undefined)
assert(map.set('foo', 'baz')    == undefined)
assert(map.get('abc')           == 123)
assert(map.get('foo')           == 'baz')
assert(map.get('def')           == undefined)

console.log("All test passed")
