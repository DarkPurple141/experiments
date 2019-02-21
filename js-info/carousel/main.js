

const $ul = document.createElement('ul')
const colors = ['red', 'blue', 'green', 'purple', 'black']
    
$ul.append(
        ...[1, 2, 3, 4, 5].map(
            (val) => Object.assign(document.createElement('li'), {
                    className: 'item',
                    textContent: val,
                    style: {
                        backgroundColor: colors[val - 1]
                    }})
        )
)

carousel.append(
    $ul
)

setTimeout(() => {
    $ul.style.transform = `translateX(${-250}px)`
}, 1000)

