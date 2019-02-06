(function () {

let nextImage = 0

const debounce = (callback, delay) => {
    let interval;
    return (...args) => {
        clearTimeout(interval)
        interval = setTimeout(() => {
            interval = null
            callback(...args)
        }, delay)
    }
}

const srcByIndex = (index) => `https://picsum.photos/400/400?image=${index}`

const main = document.querySelector('main')

window.addEventListener('scroll', debounce(
    () => {
        if (window.scrollY + window.innerHeight > document.body.scrollHeight) {
            main.appendChild(createBlock())
        }
}, 100))

main.append(...[1, 2, 3].map(createBlock))

function createBlock() {
    const $el = document.createElement('div')

    $el.className = 'block created'
    $el.appendChild(createImage(srcByIndex(nextImage++)))

    return $el
}

function createImage(src) {
    const $img = document.createElement('img')
    $img.onload = function() { this.className = 'loaded' }
    $img.src = src

    return $img; 
}

})();