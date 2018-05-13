const assert = require('assert');

function isLeftBracket(char) {
   return char == '(' || char == '{' || char == '['
}

function isRightBracket(char) {
   return char == ')' || char == '}' || char == ']'
}

function matching(char, other) {
   if (char === ')')
      return other === '('
   if (char === ']')
      return other === '['
   if (char === '}')
      return other === '{'

   return false
}

function isBalanced(str) {
   let stack = []
   for (let char of str) {
      if (isLeftBracket(char))
         stack.push(char)
      if (isRightBracket(char)) {
         let other = stack.pop()
         if (!matching(char, other)) {
            return false
         }
      }
   }

   return stack.length == 0
}


assert(isBalanced('}{')                      ==  false)
assert(isBalanced('{{}')                     ==  false)
assert(isBalanced('{}{}')                    ==  true)
assert(isBalanced('foo { bar { baz } boo }') ==  true)
assert(isBalanced('foo { bar { baz }')       ==  false)
assert(isBalanced('foo { bar } }')           ==  false)
console.log("ALL TESTS PASSSEDDDDD!")
