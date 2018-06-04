
const assert = require('assert')

const assignDeep = require('../assignd.js')
const isBalanced = require('../balanced.js')
const fib        = require('../fib.js')
const prime      = require('../prime.js')
const filter     = require('../filter.js')

describe('assignd.js', () => {
   it('test1', () => {
      const obj = assignDeep({ a: 1 }, { a: 2 })
      assert.deepStrictEqual(obj, { a: 2})
   })
   it('test2', () => {
      const obj = assignDeep({ a: 1 }, { a: { b: 2 }})
      assert.deepStrictEqual(obj, { a: { b: 2 }})
   })
   it('test3', () => {
      const obj = assignDeep({ a: { b: { c: 1 }}}, { a: { b: { d: 2 }}, e: 3 })
      assert.deepStrictEqual(obj, { a: { b: { c: 1, d: 2 }}, e: 3 })
   })
   it('test4', () => {
      const obj = assignDeep({ a: 1 }, {})
      assert.deepStrictEqual(obj, { a: 1 })
   })
})

describe('balanced.js', () => {
   it('test1', () => assert(!isBalanced('}{')))
   it('test2', () => assert(!isBalanced('{{}')))
   it('test3', () => assert(isBalanced('{}{}')))
   it('test4', () => assert(isBalanced('foo { bar { baz } boo }')))
   it('test5', () => assert(!isBalanced('foo { bar } }')))
})

describe('fib.js', () => {
   it('test1', () => assert(fib(10) == 55))
   it('test2', () => assert(fib(20) == 6765))
   it('test3', () => assert(fib(50) == 12586269025))
})

describe('prime.js', () => {
   it('test1', () => assert(!prime(1000)))
   it('test2', () => assert(!prime(1001)))
   it('test3', () => assert(prime(2)))
   it('test4', () => assert(prime(13)))
   it('test5', () => assert(prime(97)))
})

describe('filter.js', () => {
   const cb1 = (item) => item < 2
   const cb2 = (item) => item > 2
   it('test1', () => assert.deepStrictEqual(filter(cb1, [1,2,3]), [1]))
   it('test2', () => assert.deepStrictEqual(filter(cb2, [1,2,3]), [3]))
})

describe('hash.js', () => {
   it('test1', () => true)
})

describe('missing.js', () => {
   it('test1', () => true)
})
