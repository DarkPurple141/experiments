
function binaryToNum(binstr) {
   return parseInt(binstr, 2)
}

function numToBinary(num) {
   return (num >>> 0).toString(2);
}

function init() {

   const d = document
   const screen = d.createElement('div')
   const buts   = d.createElement('div')

   const controllers = [
      { id: 'btnClr', text: 'C', handler: clear(screen)  },
      { id: 'btnEql', text: '=', handler: equals(screen) }
   ]

   const operators = [
      { id: 'btnSum', text: '+', handler: operation(screen, '+') },
      { id: 'btnSub', text: '-', handler: operation(screen, '-')},
      { id: 'btnMul', text: '*', handler: operation(screen, '*')},
      { id: 'btnDiv', text: '/', handler: operation(screen, '/')}
   ]

   d.body.appendChild(screen)
   d.body.appendChild(buts)

   buts.setAttribute('id', 'btns')
   screen.setAttribute('id', 'res')

   const calculator = {
      first: null,
      second: null,
      operator: null,

      reset() {
         this.first = this.second = this.operator = null
      },
      evaluate() {
         let first = binaryToNum(this.first)
         let second = binaryToNum(this.second)

         if (this.operator == '*')
            return first * second
         else if (this.operator == '/')
            return first / second
         else if (this.operator == '+')
            return first + second
         else
            return first - second
      }
   }

   function clear(el) {
      return function () {
         calculator.reset()
         el.innerText = ""
      }
   }

   function equals(el) {
      return function() {
         let result = numToBinary(calculator.evaluate())
         calculator.operator = null
         calculator.second = null
         calculator.first = result
         el.innerText = result
      }
   }

   function operation(el, operator) {
      return function() {
         if (calculator.operator)
            return
         calculator.operator = operator
         el.innerText += operator
      }
   }

   function addCharacter(el, char) {
      return function () {
         if (calculator.operator) {
            calculator.second ? char : (calculator.second + char)
         } else {
            calculator.first ? char : (calculator.first + char)
         }

         el.innerText += char
      }
   }

   // load numbers
   for (let num in [0, 1]) {
      buts.appendChild(makeButton('btn'+num, num ,'numbers', addCharacter(screen, num)))
   }

   // load controllers
   for (let control of controllers) {
      buts.appendChild(makeButton(control.id, control.text ,'control', control.handler))
   }

   // load operators
   for (let op of operators) {
      buts.appendChild(makeButton(op.id, op.text, 'operators', op.handler))
   }


   function makeButton(id, text, cls, listener) {
      const but = d.createElement('button')

      but.setAttribute('id', id)
      but.innerText = text

      if (cls)
         but.setAttribute('class', cls)

      if (listener)
         but.addEventListener('click', listener)

        return but
   }

}

document.addEventListener('DOMContentLoaded', init)
