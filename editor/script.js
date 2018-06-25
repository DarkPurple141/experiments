"use strict";

function app() {

   const ENTER_KEY = 13
   const editor = document.getElementById('editor')
   const pre    = document.getElementsByTagName('pre')[0]

   editor.addEventListener('keydown', enterHandler)

   function newLine() {
      const line = document.createElement('span')
      line.setAttribute('class', 'line')
      line.setAttribute('contenteditable', 'true')
      line.innerHTML = "&#8203;"
      return line
   }

   function insertAfter(newNode, ref) {
      ref.parentNode.insertBefore(newNode, ref.nextSibling);
   }

   function enterHandler(e) {

      if (e.target.tagName !== 'SPAN')
         return false
      if (e.keyCode === ENTER_KEY) {
         e.preventDefault()
         const line = newLine()
         if (e.target.nextSibling)
            insertAfter(line, e.target)
         else
            pre.appendChild(line)
      }
   }

}


document.addEventListener('DOMContentLoaded', app)
