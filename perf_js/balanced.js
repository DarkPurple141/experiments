
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

module.exports = function isBalanced(str) {
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
