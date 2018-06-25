function init() {

    const d = document

    const b = makeButton('btn', 96, 48, 24)

    d.body.appendChild(b)
    
    function makeButton(id, width, height, fontsize) {
        const but = d.createElement('button')
        but.setAttribute('id', id)
        but.setAttribute('data-count', 0)
        const { style } = but
        style.width     = pixelify(width)
        style.height    = pixelify(height)
        style.fontSize  = pixelify(fontsize)
        but.innerText   = "0"
        let count = 0

        but.addEventListener('click', listener)

        function listener() {
            count++
            but.innerText = count
            but.dataset.count = count
        }

        function pixelify(attr) {
            return attr + "px"
        }

        return but

    }

}


document.addEventListener('DOMContentLoaded', init)
