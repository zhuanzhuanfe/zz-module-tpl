import { Point } from '{{name}}'

const point = new Point()
const el = document.querySelector('.test')

document.documentElement.addEventListener('click', function(e) {
  point.click(e)
  el.innerHTML = `x: ${point.x}, y: ${point.y}`
})
