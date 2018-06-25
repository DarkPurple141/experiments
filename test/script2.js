
const cleanMod = (num, max) => num < 0 ? num + max: num

function init() {

    const d = document
    const buts = d.createElement('div')
    buts.setAttribute('id', 'btns')
    buts.style.width = "75%"

    d.body.appendChild(buts)
    const toUpdate = []
    const numbers = [1, 2, 3, 6, 9, 8, 7, 4]

    for (let row = 0; row < 3; row++) {
      for (let col = 1; col <= 3; col++) {
         let count = row * 3 + col

         let but = makeButton('btn'+count,
            { count, index: numbers.indexOf(count)},
            { width: 30, height: 48, fontSize: 24 }
         )

         buts.appendChild(but)
         if (count == 5) {
            but.addEventListener('click', rotate)
         } else {
            toUpdate.push(but)
         }
      }
    }

    function rotate() {

      function updateEl(el) {
         el.dataset.index = cleanMod((el.dataset.index - 1) % numbers.length, numbers.length)
         el.innerText = numbers[el.dataset.index]
      }

      for (let button in toUpdate) {
         updateEl(toUpdate[button])
      }
    }

    function makeButton(id, data, css) {

        const but = d.createElement('button')
        but.setAttribute('id', id)
        but.setAttribute('data-index', data.index)

        const { width, height, fontSize } = css

        const { style } = but

        style.width     = width+"%"
        style.height    = pixelify(height)
        style.fontSize  = pixelify(fontSize)

        but.innerText   = data.count

        function pixelify(attr) {
            return attr + "px"
        }

        return but
    }

}


document.addEventListener('DOMContentLoaded', init)
