

const $ul = document.createElement('ul')
const colors = ['red', 'blue', 'green', 'purple', 'black']
    
$ul.append(
        ...[1, 2, 3, 4, 5].map(
            (val) => {
                const $el = document.createElement('li')
                $el.className = 'item'
                $el.textContent = val
                $el.style.backgroundColor = colors[val - 1]

                return $el
        })
)

carousel.append(
    $ul
)

setTimeout(() => {
    $ul.style.transform = `translateX(${-250}px)`
}, 1000)

