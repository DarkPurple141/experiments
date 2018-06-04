
module.exports = function fibonacci(n) {
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
