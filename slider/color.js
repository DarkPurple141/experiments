

const randomHex = () => randomInt(0,255).toString(16)
const randomInt = (min, max) => Math.floor(Math.random()*(max-min) + min)
const randomColor = () => '#'+[0,1,2].map(randomHex).join('')
const offScreen = (x, y) =>
   (x < 0 || y < 0 || x > DIMENSIONS.width || y > DIMENSIONS.height)
