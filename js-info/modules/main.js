import all from './module_1.js'
import './module_2.js'

console.log('loaded main.js')

document.body.append(
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div')
)