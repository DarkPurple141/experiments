
// export default { }

const squared  = (val) => Math.pow(val, 2)
const distance = (p1, p2) => Math.sqrt(squared(p2.x - p1.x) + squared(p2.y - p1.y))
const gravity  = (obj1, obj2) => (obj1.mass*obj2.mass) / distance(obj1.point, obj2.point)
const getAngle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)

const xVector  = (angle, force) => force * Math.cos(angle)
const yVector  = (angle, force) => force * Math.sin(angle)

function getGravity(obj1, obj2) {

   const g     = 0.04*gravity(obj1, obj2)
   const theta = getAngle(obj1.point, obj2.point)

   return { vx : xVector(theta, g), vy: yVector(theta, g) }
}
