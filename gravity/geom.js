
const GRAV_CONSTANT = 0.065

// square a number
const squared  = (val) => Math.pow(val, 2)

// get euclidean distance
export const getDistance = (p1, p2) => Math.sqrt(squared(p2.x - p1.x) + squared(p2.y - p1.y))

// get gravity between two points
const gravity  = (obj1, obj2) => (obj1.mass*obj2.mass) / getDistance(obj1.point, obj2.point)

// get angle between two points and x axis
export const getAngle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)

// split an angle and direction into vector components
const xVector  = (angle, force) => force * Math.cos(angle)
const yVector  = (angle, force) => force * Math.sin(angle)

export function getGravity(obj1, obj2) {

   const g     = GRAV_CONSTANT * gravity(obj1, obj2) / obj1.mass
   const theta = getAngle(obj1.point, obj2.point)

   return { vx : xVector(theta, g), vy: yVector(theta, g) }
}
