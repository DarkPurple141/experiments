const assert = require('assert');

function fibonacci(n) {
   let mem = [0, 1, 1]
   return (function fib(n) {
      if (mem[n])
         return mem[n]
      else {
         mem[n] = fib(n-1) + fib(n-2)
         return mem[n]
      }
   })(n)
}

assert(fibonacci(10) == 55)
assert(fibonacci(20) == 6765)
assert(fibonacci(50) == 12586269025)
console.log("Tests passed.")
