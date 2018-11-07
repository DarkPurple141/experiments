import generateRandomLevel from './setup';

function init() {
    generateRandomLevel();

    document.addEventListener('keydown', move);
    document.addEventListener('keyup', stop);

    setInterval(render, 50);
}

const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

let { top: currY, left: currX } = player.getBoundingClientRect();

const keysDown = new Set()

function move({ code }) {
    if (arrows.findIndex(code => code) !== -1) {
        keysDown.add(code);
    }
}

function stop({ code }) {
    if (arrows.findIndex(code => code) !== -1) {
        keysDown.delete(code);
    }
}

function getVelocity() {
    let { vx, vy } = [...keysDown].reduce((sum, curr) => {
        if (curr === 'ArrowLeft' && currX >= 0) {
            sum.vx -= 10;
        } else if (curr === 'ArrowRight' && currX < window.innerWidth) {
            sum.vx += 10;
        } else if (curr === 'ArrowDown') {
            sum.vy += 5;
        } else if (curr === 'ArrowUp' && currY === window.innerHeight - 50) {
            sum.vy -= 200;
        }

        return sum;
    }, { vx: 0, vy: 0, });

    // gravity
    vy += 10;

    if (currY + vy > window.innerHeight - 50) {
        vy = 0;
        currY = window.innerHeight - 50;
    }

    return { vx, vy };
}

function render() {
    const { vx, vy } = getVelocity();

    currX += vx;
    currY += vy;

    player.style.left = `${currX}px`;
    player.style.top = `${currY}px`;
}

document.addEventListener('DOMContentLoaded', init);