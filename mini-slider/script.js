
// const slider

// toggle
const {width, left: sliderLeft} = slider.getBoundingClientRect();

document.addEventListener('mousedown', mousedown, false);
toggle.ondragstart = () => false

function mousedown(e) {
    const { target, clientX } = e
    if (target !== toggle)
        return;
    e.stopPropagation();
    const {left, width: toggleWidth} = toggle.getBoundingClientRect();
    const shiftX = clientX - left;

    function safeUpdate(x) {
        const newShift = x - shiftX - sliderLeft;
        if (newShift < 0)
            return;
        
        if (newShift > (width - toggleWidth))
            return;
        
        toggle.style.left = `${newShift}px`;
    }

    document.addEventListener('mousemove', mousemove, false);
    document.addEventListener('mouseup', mouseup, false);

    function mousemove({ x }) {
        safeUpdate(x);
    }

    function mouseup() {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
    }
}
