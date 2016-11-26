import { Point } from './point'
import { MineCell, MINE } from '../shared/mineCell'
import _ from 'lodash'

const neighbourDistanceRange = [-1, 0, 1]

export class Board {
  constructor(size) {
    // this.board = cellDoubleArray
    this.size = size
    this.numberOfMines = Math.ceil((size * size) / 10)
    this.board = Board.createBlankBoard(size)
    this.addMines(Board.randomMineLocations(size, this.numberOfMines))
  }

  duplicate() {
    let duplicateBoard = new Board()
    duplicateBoard.size = this.size
    duplicateBoard.numberOfMines = this.numberOfMines
    duplicateBoard.board = this.board.map(row => {
      return row.map(cell => cell.duplicate())
    })
    return duplicateBoard
  }

  clickCell(location) {
    // cell.row, cell.column
    let cell = this.getCell(location)
    cell.clicked = true

    if (cell.isMine() || cell.value > 0) return  

    let found = []
    let todo = [location]
    while (todo.length > 0) {
      let nextLocation = todo.pop()
      // console.log('next location', nextLocation, todo)
      found.push(nextLocation)
      let neighbours = this.neighbours(nextLocation)
      for (let neighbour of neighbours) {
        // console.log('handling ', neighbour, found)
        if (_.find(found, neighbour) === undefined) {
          let cell = this.getCell(neighbour)
          cell.clicked = true
          if (cell.value === 0) {
            todo.push(neighbour)
            // console.log('adding it to todo', todo)
          } else if (!cell.clicked) {
            // console.log('clicking it, it is not zero')
            found.push(neighbour)
            // cell.clicked = true
          } else {
            // console.log('doing nothing')
          }
        }
      }
    }
  }

  neighbours(location) {
    let myNeighbours = neighbourDistanceRange.map(rowDist => {
      return neighbourDistanceRange.map(colDist => {
        return new Point(location.row+rowDist,location.col+colDist)
      }).filter(x => {
        return this.isValidCell(x) && !x.equals(location)
      })
    })
    return _.flatten(myNeighbours);
  }

  extendedNeigbours(location) {

  }

  isValidCell(location) {
    return location.row < this.size && location.col < this.size
      && location.row >= 0 && location.col >= 0 
  }

  static randomMineLocations(size, numberOfMines) {
    let mineLocations = []
    while (mineLocations.length < numberOfMines) {
      let row = Math.floor(Math.random() * size)
      let col = Math.floor(Math.random() * size)
      let proposedLocation = new Point(row, col)
      let isNewLocation = true
      for (let location of mineLocations) {
        // console.log("trying", location, proposedLocation)
        if (location.equals(proposedLocation)) {
          isNewLocation = false
          break
        }
      }
      if (isNewLocation) mineLocations.push(proposedLocation)
    }
    return mineLocations
  }

  static createBlankBoard(size) {
    let board = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j < size; j++) {
        row.push(new MineCell(0, false, new Point(i, j)))
      }
      board.push(row)
    }
    return board
  }

  addMines(mineLocations) {
    console.log("adding mines at", mineLocations)
    for (let location of mineLocations) {
      this.getCell(location).value = MINE
      let neighbours = this.neighbours(location)
      for (let neighbour of neighbours) {
        let cell = this.getCell(neighbour)
        if (!cell.isMine()) cell.value += 1
      }
    }
  }

  getCell(location) {
    return this.board[location.row][location.col]
  }

  toString() {
    let boardAsString = "["
    for (let row of this.board) {
      boardAsString += "["
      for (let cell of row) {
        boardAsString += `[${cell.value},${cell.clicked}]`
      }
      boardAsString += "]\n"
    }
    boardAsString += "]"
    return boardAsString
  }

}

function isNeighbour(neighbourRow, neighbourColumn, yourRow, yourColumn) {
    let rowDist = Math.abs(neighbourRow - yourRow)
    let colDist = Math.abs(neighbourColumn - yourColumn)

    return (rowDist === 1 && colDist <= 1) || (rowDist === 0 && colDist === 1)
}
