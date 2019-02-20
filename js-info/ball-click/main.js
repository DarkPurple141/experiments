(function() {

function init() {
    app.addEventListener('click', moveBall, false)
}

const relativeCoords = {
    get x() {
        const {left} = app.getBoundingClientRect()
        const ballCentre = ball.offsetWidth/2
        return left + ballCentre
    },

    get y() {
        const {top} = app.getBoundingClientRect()
        const ballCentre = ball.offsetHeight/2
        return top + ballCentre
    }
}

/**
 * @param {MouseEvent} 
 */
function moveBall({ x, y }) {
    const { x: relativeX, y: relativeY } = relativeCoords
    ball.style.transform = `translate(${x - relativeX}px, ${y - relativeY}px)`
}

document.addEventListener('DOMContentLoaded', init)

})();