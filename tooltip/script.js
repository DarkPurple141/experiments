document.addEventListener('DOMContentLoaded', init);

let selected = null;
let tooltip = null

function init() {
    house.addEventListener('mouseover', mouseover)
    house.addEventListener('mouseout', mouseout)
    tooltip =  document.createElement('div')
    tooltip.className = 'tooltip hide'
    document.body.append(tooltip);
}

function showToolTip(element) {
    const {x, y, width} = element.getBoundingClientRect();

    tooltip.style.left = `${x + width + 10}px`;
    tooltip.style.top  = `${y}px`;

    tooltip.textContent = element.dataset.tooltip;

    if (tooltip.classList.contains('hide')) {
        tooltip.classList.toggle('hide')
    }

}

function hideToolTip() {
    tooltip.classList.add('hide')
}

// target === mousecameover
function mouseover({ target }) {
    const {tooltip} = target.dataset;

    let element = target;

    if (tooltip) {
        console.log(tooltip)
    } else {
        do {
            element = target.parentNode;
        } while (!element.dataset.tooltip)

        console.log(element.dataset.tooltip)
    }

    if (selected === element) {
        return;
    }

    selected = element;

    void showToolTip(selected);
}

function mouseout({ relatedTarget}) {
    if (relatedTarget === document.body)
        hideToolTip();

    console.log(relatedTarget)
}