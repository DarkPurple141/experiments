
// import geom as g from './geom.js'

const DIMENSIONS = {
   width: 300,
   height: 300
}

const randomHex = () => randomInt(0,255).toString(16)
const randomInt = (min, max) => Math.floor(Math.random()*(max-min) + min)
const randomColor = () => '#'+[0,1,2].map(randomHex).join('')
const offScreen = (x, y) =>
   (x < 0 || y < 0 || x > DIMENSIONS.width || y > DIMENSIONS.height)


function makeLineElement(x, y) {
   const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')

   line.setAttribute('x2', x)
   line.setAttribute('x1', x)
   line.setAttribute('y2', y)
   line.setAttribute('y1', y)

   return line
}

function makeCircleElement(x, y, vx, vy) {
   console.log('circle')
   const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

   const mass = randomInt(1, 10)

   circle.setAttribute('cx', x || randomInt(0, DIMENSIONS.width))
   circle.setAttribute('cy', y || randomInt(0, DIMENSIONS.height))
   circle.setAttribute('r', mass)
   circle.setAttribute('fill', randomColor())

   circle.data = {
      vx: vx || 0,
      vy: vy || 0,
      mass,
   }

   return circle
}

function extractPoint(circle) {
   let x = Number(circle.attributes['cx'].nodeValue)
   let y = Number(circle.attributes['cy'].nodeValue)

   return { x, y }
}

function setDimensions() {
   DIMENSIONS.width  = window.innerWidth - 10
   DIMENSIONS.height = window.innerHeight - 5
}

function init () {
   const c = document.getElementById('content')
   const text = document.getElementById('stats')

   setDimensions()

   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
   svg.setAttribute('viewBox', `0 0 ${DIMENSIONS.width} ${DIMENSIONS.height}`)
   svg.addEventListener('click', (evt) => addCircleToSVG(svg, evt))
   svg.addEventListener('mousedown', (evt) => traceLine(svg, evt))
   svg.addEventListener('touchstart', (evt) => traceLine(svg, evt))

   let circles = []

   for (let i = 0; i < 20; i++) {
      addCircleToSVG(svg)
   }

   function traceLine(parent, evt) {

      const startx = evt.x || evt.touches[0].clientX
      const starty = evt.y || evt.touches[0].clientY

      const line   = makeLineElement(startx, starty)

      parent.appendChild(line)

      function mouseMove(e) {
         line.attributes['x2'].nodeValue = e.x || e.changedTouches[0].clientX
         line.attributes['y2'].nodeValue = e.y || e.changedTouches[0].clientY
      }

      function mouseUp(e) {
         window.removeEventListener('mousemove', mouseMove)
         window.removeEventListener('mouseup', mouseUp)
         window.removeEventListener('touchend', mouseUp)
         window.removeEventListener('touchmove', mouseMove)

         const x = e.x || e.changedTouches[0].clientX
         const y = e.y || e.changedTouches[0].clientY

         parent.removeChild(line)

         const p1 = { x: startx, y: starty }
         const p2 = { x, y }

         const dist  = 0.5 * distance(p1, p2)
         const angle = getAngle(p1, p2)
         const circle = makeCircleElement(
            startx, starty, dist * Math.cos(angle) * 0.5, dist * Math.sin(angle) * 0.5
         )
         parent.appendChild(circle)
         circles.push(circle)
      }

      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseUp)
      window.addEventListener('touchmove', mouseMove)
      window.addEventListener('touchend', mouseUp)

   }

   function removeCircle(circle) {
      svg.removeChild(circle)
      const index = circles.indexOf(circle)
      circles.splice(index, 1)
   }

   function addCircleToSVG(svgEl, e) {
      let circle = e ? makeCircleElement(e.x, e.y) : makeCircleElement()
      svgEl.appendChild(circle)
      circles.push(circle)
   }

   function animate() {

      const s = new Set()

      for (const el of circles) {

         if (s.has(el)) continue

         let x = el.attributes['cx'].nodeValue
         let y = el.attributes['cy'].nodeValue

         // reset velocity and work out acceleration
         // el.data.vx =  el.data.vx * 0.999
         // el.data.vy =  el.data.vy * 0.999

         let p1 = extractPoint(el)

         for (const alt of circles) {
            if (alt === el) continue
            let p2 = extractPoint(alt)
            let { vx, vy } = getGravity(
               { point: p1, mass: el.data.mass },
               { point: p2, mass: alt.data.mass }
            )

            if (distance(p1, p2) < el.data.mass) {
               el.data.mass += alt.data.mass
               el.attributes['r'].nodeValue = el.data.mass
               el.data.vx *= 0.5
               el.data.vy *= 0.5

               s.add(alt)
               removeCircle(alt)

            } else {
               el.data.vx += vx
               el.data.vy += vy
            }
         }
         /*
         if (offScreen(Number(x), Number(y))) {
            removeCircle(el)
         }
         */

      }

      // do this after working out vel
      for (const el of circles) {

         let x = el.attributes['cx'].nodeValue
         let y = el.attributes['cy'].nodeValue

         el.attributes['cx'].nodeValue = +x+el.data.vx
         el.attributes['cy'].nodeValue = +y+el.data.vy
      }

      // update text
      text.innerHTML = circles.length

   }

   c.appendChild(svg)

   const id = setInterval(animate, 25)

}


document.addEventListener('DOMContentLoaded', init)
