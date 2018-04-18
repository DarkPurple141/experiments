"use strict";

class App {
   static init() {
      const main = document.getElementById('content')
      //const box  =

      for (let i = 0; i < 25; i++) {
         main.appendChild(Container(i))
      }

      main.children[10].setAttribute('draggable', 'true')
   }

   static dragstart() {
    this.className += " held"

    setTimeout(() => {
      this.className = "invisible"
     }, 0)
  }

  static dragend() {
    this.className = "box"
  }

  static dragover(e) {
    e.preventDefault()
  }

  static dragenter(e) {
    e.preventDefault()
    this.className += " hovered"
  }

  static dragleave() {
    this.className = "holder"
  }

  static drop() {
    this.className = "holder"
    this.append(App.box)
  }

}

function Container(number) {
   const box = Box(number)
   box.addEventListener("dragover", App.dragover)
   box.addEventListener("dragenter", App.dragenter)
   box.addEventListener("dragleave", App.dragleave)
   box.addEventListener("drop", App.drop)
   return box
}

function Box(number) {

   const div = document.createElement('div')
   const box = document.createElement('div')

   div.className = "box"
   box.className = "hide"

   const p = document.createElement('p')

   p.setAttribute('selectable', 'false')
   p.innerHTML = number
   box.appendChild(p)
   div.appendChild(box)

   return div
}

document.addEventListener('DOMContentLoaded', App.init)
