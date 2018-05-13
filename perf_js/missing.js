
function seqsum(n) {
   if (n == 0)
      return 0
   else
      return n + seqsum(n-1)
}

function missing(seq) {
   let sum    = seqsum(seq.length + 1)
   let actual = seq.reduce((acc, curr) => acc + curr)

   return sum - actual
}

console.log(missing([1,5,2,3]))
console.log(missing([1,4,2,3]))
console.log(missing([1,6,4,2,3]))
