import { Board } from './board'
import { Point } from './point'
import { MineCell } from '../shared/mineCell'
import _ from 'lodash'

describe('board', () => {
  describe('constructor', () => {
    it('sets the size of the board to the size of the arg', () => {
      const size = 10
      const board = new Board(size)
      expect(board.size).toEqual(size)
    })
    it('sets the number of mines to 10% of the number of cells of the board', () => {
      expect(new Board(3).numberOfMines).toBe(1)
      expect(new Board(10).numberOfMines).toBe(10)
      expect(new Board(100).numberOfMines).toBe(1000)
    })
    it('creates a double array of mine cells as the board property', () => {
      const board = new Board(4)
      expect(board.board).toBeDefined()
      expect(_.isArray(board.board)).toBe(true)
      for (let row of board.board) {
        expect(_.isArray(row)).toBe(true)
        for (let cell of row) {
          expect(cell instanceof MineCell).toBe(true)
        }
      }
    })
    it('puts mines on the board', () => {
      const board = new Board(3)
      let countMines = 0
      for (let row of board.board) {
        for (let cell of row) {
          if (cell.isMine()) countMines++
        }
      }
      expect(countMines).toEqual(1)
    })
    it('sets the value of the non-mine cells to the count of mines in their neighbours', () => {
      const board = new Board(10)
      for (let row of board.board) {
        for (let cell of row) {
          if (!cell.isMine()) {
            let neighbours = board.neighbours(cell.location)
            let countMinesInNeighbours = neighbours.map(cellLocation => {
              return board.getCell(cellLocation).isMine() ? 1 : 0
            }).reduce((x, y) => x + y)
            expect(countMinesInNeighbours).toEqual(cell.value)
          }
        }
      }
    })
  })
  describe('get neighbours of a cell', () => {
    it('does not return cells out of bounds on the left', () => {
      const size = 3
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(1, 0))
      expect(neighbours.length).toBe(5)
      expect(neighbours).toContainEqual(new Point(0,0))
      expect(neighbours).toContainEqual(new Point(0,1))
      expect(neighbours).toContainEqual(new Point(1,1))
      expect(neighbours).toContainEqual(new Point(2,1))
      expect(neighbours).toContainEqual(new Point(2,0))
    })
    it('does not return cells out of bounds on the top', () => {
      const size = 3
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(0, 1))
      expect(neighbours.length).toBe(5)
      expect(neighbours).toContainEqual(new Point(0,0))
      expect(neighbours).toContainEqual(new Point(1,0))
      expect(neighbours).toContainEqual(new Point(1,1))
      expect(neighbours).toContainEqual(new Point(1,2))
      expect(neighbours).toContainEqual(new Point(0,2))
    })
    it('does not return cells out of bounds on the right', () => {
      const size = 3
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(1, 2))
      expect(neighbours.length).toBe(5)
      expect(neighbours).toContainEqual(new Point(0,2))
      expect(neighbours).toContainEqual(new Point(0,1))
      expect(neighbours).toContainEqual(new Point(1,1))
      expect(neighbours).toContainEqual(new Point(2,1))
      expect(neighbours).toContainEqual(new Point(2,2))
    })
    it('does not return cells out of bounds on the bottom', () => {
      const size = 3
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(2, 1))
      expect(neighbours.length).toBe(5)
      expect(neighbours).toContainEqual(new Point(2,0))
      expect(neighbours).toContainEqual(new Point(1,0))
      expect(neighbours).toContainEqual(new Point(1,1))
      expect(neighbours).toContainEqual(new Point(1,2))
      expect(neighbours).toContainEqual(new Point(2,2))
    })
    it('does not contain itself', () => {
      const size = 1
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(0,0))
      expect(neighbours).toEqual([])
    })
    it('contains all neighbours surrounding the cell', () => {
      const size = 3
      const board = new Board(size)
      const neighbours = board.neighbours(new Point(1, 1))
      expect(neighbours.length).toBe(8)
      expect(neighbours).toContainEqual(new Point(0,0))
      expect(neighbours).toContainEqual(new Point(0,1))
      expect(neighbours).toContainEqual(new Point(0,2))
      expect(neighbours).toContainEqual(new Point(1,0))
      expect(neighbours).toContainEqual(new Point(1,2))
      expect(neighbours).toContainEqual(new Point(2,0))
      expect(neighbours).toContainEqual(new Point(2,1))
      expect(neighbours).toContainEqual(new Point(2,2))
    })
  })
  describe('random mine locations', () => {
    it('creates an array with the given number of mine locations', () => {
      expect(Board.randomMineLocations(3, 1).length).toBe(1)
      expect(Board.randomMineLocations(10, 10).length).toBe(10)
    })
    it('creates an array with valid locations on the board', () => {
      const board = new Board(10)
      const mineLocations = Board.randomMineLocations(10, 10)
      for (let point of mineLocations) {
        expect(board.isValidCell(point)).toBe(true)
      }
    })
    it('contains only unique locations', () => {
      const mineLocations = Board.randomMineLocations(10)
      for (let i = 0; i < mineLocations.length; i++) {
        for (let j = i + 1; j < mineLocations.length; j++) {
          expect(mineLocations[i].equals(mineLocations[j])).toBe(false)
        }
      }
    })
  })
  describe('clickCell', () => {
    it('sets clicked value to true of the cell location that is clicked', () => {
      const board = new Board(3)
      const location = new Point(1,1)
      board.clickCell(location)
      expect(board.getCell(location).clicked).toBe(true)
    })
    it('clicks surrounding cells, if its value is zero', () => {
      const mineLocations = [new Point(0,2)]
      const board = createDummyBoard(3, mineLocations)
      const location = new Point(2,2)
      board.clickCell(location)
      for (let row of board.board) {
        for (let cell of row) {
          if (cell.location.equals(mineLocations[0])) expect(cell.clicked).toBe(false)
          else expect(cell.clicked).toBe(true) 
        }
      }
    })
  })
})

function createDummyBoard(size, mineLocations) {
  const board = new Board(size)
  board.board = Board.createBlankBoard(size)
  board.addMines(mineLocations)
  return board
}