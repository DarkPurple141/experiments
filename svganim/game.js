
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

   const mass = randomInt(0, 10)

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
   DIMENSIONS.width  = window.innerWidth
   DIMENSIONS.height = window.innerHeight
}

function init () {
   const c = document.getElementById('content')

   setDimensions()

   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
   svg.setAttribute('viewBox', `0 0 ${DIMENSIONS.width} ${DIMENSIONS.height}`)
   svg.addEventListener('click', (evt) => addCircleToSVG(svg, evt))
   svg.addEventListener('mousedown', (e) => traceLine(svg, e))

   let circles = []

   for (let i = 0; i < 20; i++) {
      addCircleToSVG(svg)
   }

   function traceLine(parent, evt) {

      const startx = evt.x
      const starty = evt.y

      const line   = makeLineElement(startx, starty)

      parent.appendChild(line)

      function mouseMove(e) {
         line.attributes['x2'].nodeValue = e.x
         line.attributes['y2'].nodeValue = e.y
      }

      function mouseUp({ x, y }) {
         window.removeEventListener('mousemove', mouseMove)
         window.removeEventListener('mouseup', mouseUp)

         parent.removeChild(line)

         const p1 = { x: startx, y: starty }
         const p2 = { x, y }

         const dist  = 0.5 * distance(p1, p2)
         const angle = getAngle(p1, p2)
         const circle = makeCircleElement(
            startx, starty, dist * Math.cos(angle), dist * Math.sin(angle)
         )
         parent.appendChild(circle)
         circles.push(circle)
      }

      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseUp)

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

      for (el of circles) {

         if (s.has(el)) continue

         let x = el.attributes['cx'].nodeValue
         let y = el.attributes['cy'].nodeValue

         // reset velocity and work out acceleration
         // el.data.vx = el.data.vx
         // el.data.vy = el.data.vy

         let p1 = extractPoint(el)

         for (alt of circles) {
            if (alt === el) continue
            let p2 = extractPoint(alt)
            let { vx, vy } = getGravity(
               { point: p1, mass: el.data.mass },
               { point: p2, mass: alt.data.mass }
            )

            if (distance(p1, p2) < el.data.mass) {
               el.data.mass += alt.data.mass
               el.attributes['r'].nodeValue = el.data.mass
               el.data.vx += alt.data.vx
               el.data.vy += alt.data.vy

               s.add(alt)
               removeCircle(alt)

            } else {
               el.data.vx += vx
               el.data.vy += vy
            }
         }

         if (offScreen(Number(x), Number(y))) {
            removeCircle(el)
         }

      }

      // do this after working out vel
      for (el of circles) {
         let x = el.attributes['cx'].nodeValue
         let y = el.attributes['cy'].nodeValue

         el.attributes['cx'].nodeValue = +x+el.data.vx
         el.attributes['cy'].nodeValue = +y+el.data.vy
      }
   }

   c.appendChild(svg)

   const id = setInterval(animate, 30)

}


document.addEventListener('DOMContentLoaded', init)
