"use strict";

let dragging = null

function toggleHide(el) {
   el.classList.toggle('hide')
}

function beginDrag(e) {
   console.log(e)
   toggleHide(e.target)
   dragging = simpleBox(e.target.children[0].innerHTML, true)
   dragging.style.top = e.screenY
   dragging.style.left = e.screenX
   document.getElementById('content')
      .appendChild(dragging)
}

function endDrag(e) {
   console.log('end drop')
   document.getElementById('content')
      .removeChild(dragging)
   dragging = null
}

function Box(number) {
   const box = simpleBox(number)

   box.addEventListener("mousedown", beginDrag)
   box.addEventListener("mouseup", endDrag)

   return box
}

function simpleBox(number, clone=false) {

   const div = document.createElement('div')
   if (clone) {
      div.className = "box clone"
   } else {
      div.className = "box"
   }

   const p = document.createElement('p')

   p.setAttribute('selectable', 'false')
   p.innerHTML = number
   div.appendChild(p)

   return div
}


window.onload = function() {
   const main = document.getElementById('content')
   for (let i = 0; i < 50; i++) {
      main.appendChild(Box(i))
   }
}
