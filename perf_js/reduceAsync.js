let a = () => Promise.resolve('a')
let b = () => Promise.resolve('b')
let c = () => new Promise(resolve => setTimeout(() => resolve('c'), 100))

reduceAsync([a, b, c], (acc, value) => [...acc, value], [])
// ['a', 'b', 'c']
reduceAsync([a, c, b], (acc, value) => [...acc, value], ['d'])
// ['d', 'a', 'c', 'b']

function reduceAsync(list, fn, start) {
   start = Promise.resolve(start)
   for (let prom of list) {
      start = start.then(curr => Promise.all([curr, prom()]))
                   .then(data => fn(data[0], data[1]))
   }
   return start.then(d => console.log(d))
}
