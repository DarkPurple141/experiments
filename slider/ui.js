
function makeSlide(parent, content) {

   const div = document.createElement('div')
   div.classList.add('slide', 'left')
   div.style['background-color'] = randomColor()

   div.innerHTML = "<h1>"+ content + "</h1>"

   parent.appendChild(div)

   return div
}

const delay = (time) => new Promise(res => setTimeout(res, time))



function hideElements() {
   const elements = Array.from(arguments)
   for (const arg of elements) {
      arg.classList.toggle('hide')
   }
}

function slideFactory(parent, num) {

   const slides = Array.apply(null, new Array(num))
                       .map((item, index) => makeSlide(parent, index))

   const MAX = num - 1
   let index = 0
   let current = slides[0]

   current.classList.remove('hide', 'left')

   return {
      next() {
         if (this.checkIndex(1))
            return

         const old = current
         current = current.nextSibling

         old.classList.add('right')
         current.classList.remove('left')

         index++
         this.updateIndex()
      },
      prev() {
         if (this.checkIndex(-1))
            return

         const old = current
         current = current.previousSibling

         old.classList.add('left')
         current.classList.remove('right')

         index--
         this.updateIndex()
      },
      checkIndex(incr) {
         return (index + incr > MAX || index + incr < 0)
      },
      updateIndex() {
         parent.children[0].innerHTML = `${index + 1}/${MAX + 1}`
      }
   }
}

function unify(e) {
   if (e.x)
      return e
   else {
      e.x = e.changedTouches[0].clientX
      e.y = e.changedTouches[0].clientY
   }

   return e
}

function right(e, cb) {
   e.preventDefault()
   if (e.key == 'ArrowRight')
      cb()
}

function left(e, cb) {
   e.preventDefault()
   if (e.key == 'ArrowLeft')
      cb()
}

function swipe(ev, ui) {

   ev.preventDefault()
   const { x, y } = ev

   function swipe_end(e) {
      window.removeEventListener('touchend', swipe_end)
      window.removeEventListener('mouseup', swipe_end)

      e = unify(e)

      const x_difference = e.x - x

      if (Math.abs(x_difference) < 20) {
         return
      }

      x_difference > 0 ? ui.prev() : ui.next()
   }

   window.addEventListener('touchend', swipe_end)
   window.addEventListener('mouseup', swipe_end)

}


function init() {

   const parent = document.getElementById('slides')
   const ui = slideFactory(parent, 10)

   window.addEventListener('keydown', (e) => right(e, ui.next.bind(ui)))
   window.addEventListener('keydown', (e) => left(e, ui.prev.bind(ui)))
   window.addEventListener('mousedown', (e) => swipe(unify(e), ui))
   window.addEventListener('touchstart', (e) => swipe(unify(e), ui))
   window.addEventListener('resize', () => { parent.style.height = window.innerHeight + "px"})

   parent.style.height = window.innerHeight + "px"

   document.removeEventListener('DOMContentLoaded', init)
}




document.addEventListener('DOMContentLoaded', init)
