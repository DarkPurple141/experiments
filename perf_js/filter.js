
module.exports = function filter(callback, thisArg) {
   let filtered = []
   let array = thisArg || this
   for (let index = 0; index < array.length; index++) {
      if (callback(array[index], index, thisArg)) {
         filtered.push(array[index])
      }
   }
   return filtered
}
