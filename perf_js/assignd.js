
// Essentially Object.assign
module.exports = function assignDeep(obj, merge) {
   if (typeof merge !== 'object')
      return merge
   if (typeof obj !== 'object')
      obj = {}
   for (let key in merge) {
      if (obj[key])
         obj[key] = assignDeep(obj[key], merge[key])
      else {
         obj[key] = assignDeep({}, merge[key])
      }
   }
   return obj
}
