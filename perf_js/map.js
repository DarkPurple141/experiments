
Array.prototype.map = function(callback, thisArg) {
   const mapped = []
   const self    = thisArg || this

   for (let index = 0; index < self.length; index++) {
      mapped[index] = callback(self[index], index, thisArg)
   }

   return mapped
}

console.log([1,2,3].map((item) => item*5))
console.log([1,2,3].map((item, index) => item*5 + index))

console.log([1,5,10].filter((item, index) => index % 2 == 0))
