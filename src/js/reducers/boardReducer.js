import { MineCell } from '../actions/boardActions'
import _ from 'lodash'

// this is a model of the store variables
export default function reducer(state={
    board: newBoard(),
}, action) {

    switch (action.type) {
        case "FETCH_NEW_BOARD_FULFILLED": {
            // creates a new copy of the state and sets the new values
            // ...state: currently stage 3 proposal https://github.com/sebmarkbage/ecmascript-rest-spread
            // return {...state, board: action.payload}
            let obj = Object.assign({}, 
                state, 
                {
                    board:newBoard()
                }
            );
            return obj;
        }
        case "CLICKED_CELL": {
            console.log("setting clicked to true " + action.payload.row + ", " + action.payload.column);
            // let obj = Object.assign({}, state);
            // console.log(obj.board[action.payload.row][action.payload.column].clicked);
            // obj.board[action.payload.row][action.payload.column].clicked=true;
            // console.log(obj.board[action.payload.row][action.payload.column].clicked);
            // return obj;
            if (action.payload.row < 0 || action.payload.column < 0 ||
                action.payload.row > state.board.length || action.payload.column > state.board.length) 
            {
                // skip if out of bounds
                return state
            }
            let obj = Object.assign({}, 
                state,
                {
                    board: updateBoard(state.board, action.payload.row, action.payload.column)
                }
            );
            return obj;
        }
    }

    // default
    return state
}

function copyArray(array) {
    return array.map(x => x)
}

function newBoard() {
    return [
        [new MineCell("0",Math.random()*10 >= 5), new MineCell("1",false), new MineCell("*",false)],
        [new MineCell("0",false), new MineCell("1",false), new MineCell("1",false)],
        [new MineCell("0",false), new MineCell("0",false), new MineCell("0",false)],
    ]
}

function updateBoard(board, row, column) {
    let others = getNeighbours(board,row,column) 
    let updatedBoard = board.map((aRow, i) => {
        return aRow.map((cell, j) => {
            let newAttributes = {}
            console.log("finding", i, j, (_.find(others, new Point(i,j)) !== undefined ))
            if ((i === row && j === column) || _.find(others, new Point(i,j)) !== undefined) {
                newAttributes.clicked = true;
            } 
            return Object.assign({}, cell, newAttributes);
        })
    })
    return updatedBoard;
}

export class Point {
    constructor(row, col) {
        this.row = row
        this.col = col
    }

    equals(other) {
        this.row === other.row && this.col === other.col
    }
    '==='(other) {
        this.equals(other)
    }
}

function neighbours(board, row, column) {
    //if (board[row][column].value !== "0") return []
    
    let rows = [-1,0,1]
    let cols = [-1,0,1]
    console.log(row, column, board.length)
    let myNeighbours = rows.map(r => cols.map(c => new Point(row+r,column+c))
    .filter(x => {
        // console.log(x, x.row, row, x.col, column, (x.row === row && x.col === column))
        return x.row >= 0 && x.col >= 0 && !(x.row == row && x.col == column)
            && x.row < board.length && x.col < board.length
    }))
    // let union = _.union(myNeighbours, found)
    // let diff = _.difference(myNeighbours, found)

    return _.flatten(myNeighbours);
}

window.neighbours = neighbours
window.newBoard = newBoard
window.getNeighbours = getNeighbours


function getNeighbours(board, row, column) {
    let found = []
    let todo = []
    if (board[row][column].value == "0") todo.push(new Point(row,column))
    let done = []
    let count = 0;
    console.log(row, column)
    // while (count < 4 || todo.length > 0) {
    while (todo.length > 0) {
        let next = todo.pop()
        console.log("next", next)
        let neigbours = neighbours(board, next.row, next.col).filter(x => !(x.row === row && x.col === column))
        console.log("neighbours", neigbours)
        let others = neigbours.filter(x => {
            console.log(x, board[x.row][x.col].value === "0")
            return board[x.row][x.col].value === "0"
        })
        console.log("Others", others)
        console.log("found", found)
        others = others.filter(x => _.find(found, x) === undefined)
        console.log("Others", others)
        
        found = union(found, neigbours)
        console.log("found", found)
        console.log("Todo:", todo)
        todo = union(todo, others)
        console.log("Todo:", todo)
        count++;
    }
    console.log("found " + found)
    return found
}
window.union = union
window.Point = Point
function union(one, two) {
    return _.uniqWith(
        _.union(one, two),
        _.isEqual)
}


function isNeighbour(neighbourRow, neighbourColumn, yourRow, yourColumn) {
    let rowDist = Math.abs(neighbourRow - yourRow)
    let colDist = Math.abs(neighbourColumn - yourColumn)

    return (rowDist === 1 && colDist <= 1) || (rowDist === 0 && colDist === 1)
}
