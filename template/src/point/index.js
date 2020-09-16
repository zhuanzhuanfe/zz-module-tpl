/**
 * 为保证支持按需加载，务必使用 export default
 */

export default class Point {
  /**
   * @classdesc Create a point.
   * @constructs Point
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x, y) {
    this.x = x
    this.y = y
    console.log('this is demo')
  }

  /**
   * Get the x value.
   * @method Point#click
   * @return {number} The x value.
   */
  click(e) {
    this.x = e.x
    this.y = e.y
  }
}
