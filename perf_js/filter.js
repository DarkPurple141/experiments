
Array.prototype.filter = function (callback, thisArg) {
   let filtered = []
   let array = thisArg || this
   for (let index = 0; index < array.length; index++) {
      if (callback(array[index], index, thisArg)) {
         filtered.push(array[index])
      }
   }
   return filtered
}

console.log([1,2,3].filter((item) => item < 2 ))
console.log([1,2,3].filter((item) => item > 2 ))
