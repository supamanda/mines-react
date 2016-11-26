import { Point } from './point'

describe('point', () => {
  describe('constructor', () => {
    it('sets the row property', () => {
      expect(new Point(2, 5).row).toBe(2)
    })
    it('sets the col property', () => {
      expect(new Point(2, 5).col).toBe(5)
    })
  })
  describe('equals method', () => {
    it('considers the same point to be equal', () => {
      let point = new Point(3, 5)
      expect(point.equals(point)).toBe(true)
    })
    it('considers two points with the same row and col vals to be equal', () => {
      let pointA = new Point(2, 4)
      let pointB = new Point(2, 4)
      expect(pointA.equals(pointB)).toBe(true)
    })
    it('considers two points with different row vals to not be equal', () => {
      let pointA = new Point(2, 4)
      let pointB = new Point(3, 4)
      expect(pointA.equals(pointB)).toBe(false)
    })
    it('considers to points with different col vals to not be equal', () => {
      let pointA = new Point(2, 3)
      let pointB = new Point(2, 4)
      expect(pointA.equals(pointB)).toBe(false)
    })
  })
})