"use strict";

let held = []
let selected = []

document.addEventListener("mousedown", beginDrag)
document.addEventListener("mouseup", endDrag)
document.addEventListener("mousemove", updateDrag)

function beginDrag(e) {
  if (e.target.className != "box") return
  e.target.classList.add("hide")
  let n = e.target.children[0].innerHTML
  let clone = Box(n,true)
  document.getElementById("content").appendChild(clone)
  held.push(clone)
  selected.push(e.target)
  updateDrag(e)
}

function endDrag(e) {
  if (held.length <= 0) return

  let elm = held.pop()
  let dad = elm.parentNode
  dad.removeChild(elm)

  let srcElm = selected.pop()
  srcElm.classList.remove("hide")
}

function updateDrag(e) {
  if (held.length <= 0) return
  held[0].style.left = (e.clientX-(held[0].clientWidth/2))+"px";
  held[0].style.top = (e.clientY-(held[0].clientHeight/2))+"px";
}
function Box(number, clone=false) {
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
