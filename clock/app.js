"use strict";

(function() {
    document.addEventListener('DOMContentLoaded', init);

    const secondHand = document.getElementById('second')
    const minuteHand = document.getElementById('minute')
    const hourHand   = document.getElementById('hour')

    /*
    const range = (max) => Array(max).fill(null)
    const getXPos = (angle) => Math.sin(angle)
    const getXPosOnCircle = (radius) => angle => radius * getXPos(angle)
    const getYPos = (angle) => Math.cos(angle)
    const getYPosOnCircle = (radius) => angle => radius * getYPos(angle)
    */

    function updateElementTime(element, time, multiplier) {
        let rotations = +element.dataset['rotations'];
        const rotation = time * multiplier;
        
        if (rotation === 0) {
            rotations++;
            element.dataset['rotations'] = rotations;
        }

        const angle = rotation + rotations * 360;
        
        element.style.transform = `rotate(${angle}deg)`
    }

    function getCurrentTime() {
        const d       = new Date()
        const hours   = d.getHours()
        const minutes = d.getMinutes()
        const seconds = d.getSeconds()
        return { hours, minutes, seconds }
    }


    function init () {
        const { hours, minutes, seconds } = getCurrentTime();
        [minuteHand, secondHand, hourHand].forEach(el => {
            el.setAttribute('data-rotations', -1)
        });
        updateElementTime(minuteHand, minutes, 6);
        updateElementTime(secondHand, seconds, 6);
        updateElementTime(hourHand, hours, 30);
        tick();
    }

    let { hours, minutes, seconds } = getCurrentTime();
    
    function tick() {
        
        const { hours: currHours, minutes: currMinutes, seconds: currSeconds } = getCurrentTime()

        if (minutes !== currMinutes) {
            minutes = currMinutes;
            updateElementTime(minuteHand, minutes, 6);
        }

        if (seconds !== currSeconds) {
            seconds = currSeconds;
            updateElementTime(secondHand, seconds, 6);
        } 

        if (hours !== currHours) {
            hours = currHours;
            updateElementTime(hourHand, hours, 30);
        }
        
        requestAnimationFrame(tick);
    }

})();


