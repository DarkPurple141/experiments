
function isPrime(num) {

   if (num == 2) {
      return true
   } else if (num % 2 == 0) {
      return false
   }

   let calls = 0
   for (let i = 3; i < Math.sqrt(num); i+=2) {

      if (num % i == 0) {
         return false
      }
   }
   return true
}

function findPrimes(n) {
   const primes = []
   for (let i = 0; i < n; i++) {
      if (isPrime(i))
         primes[i] = i
      else
         primes[i] = 0
   }
   return primes.filter(item => item)
}

module.exports = isPrime
