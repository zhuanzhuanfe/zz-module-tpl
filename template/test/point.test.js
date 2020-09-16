import { Point } from '../src'

describe('Point', () => {
  const point = new Point()

  test('click', () => expect(point.click({})).toBeUndefined())
})
