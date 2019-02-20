(function() {

function init() {
    window.addEventListener('mousedown', startMove, false)
}

function startMove(startEvent) {
    // prevent image drag
    startEvent.preventDefault()
    
    if (!startEvent.target.hasAttribute('data-draggable'))
        return
    const {left: ballLeft, top: ballTop} = ball.getBoundingClientRect()
    
    const startX = startEvent.x - ballLeft
    const startY = startEvent.y - ballTop

    window.addEventListener('mousemove', moveBall, false)
    window.addEventListener('mouseup', mouseUp, false)

    /**
     * clean up
     */
    function mouseUp() {
        window.removeEventListener('mousemove', moveBall)
        window.removeEventListener('mouseup', mouseUp)
    }

    /**
     * @param {MouseEvent} event
     * 
     */
    function moveBall({ x, y }) {
        const {left, top, width, height} = document
            .querySelector('.block')
            .getBoundingClientRect()
        const newPosX = x - startX + window.scrollX
        const newPosY = y - startY + window.scrollY
        if (newPosX < left)
            return
        
        if (newPosY < top)
            return

        if (newPosX > left + width - ball.offsetWidth)
            return
        
        if (newPosY > top + height - ball.offsetHeight)
            return

        ball.style.transform = `translate(${newPosX}px, ${newPosY}px)`
    }
}



document.addEventListener('DOMContentLoaded', init)

})();