import { Board } from './board'
import { Point } from './point'
import _ from 'lodash'

const status = {
  PLAYING: 'playing',
  LOST: 'lost',
  WON: 'won'
}

// this is a model of the store variables
export default function reducer(state={
    board: new Board(5),
    status: status.PLAYING
}, action) {

    switch (action.type) {
        case "FETCH_NEW_BOARD_FULFILLED": {
            // creates a new copy of the state and sets the new values
            // ...state: currently stage 3 proposal https://github.com/sebmarkbage/ecmascript-rest-spread
            // return {...state, board: action.payload}
            let obj = Object.assign({}, 
                state, 
                {
                    board: new Board(5),
                    status: status.PLAYING
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
            // if (action.payload.row < 0 || action.payload.column < 0 ||
            //     action.payload.row > state.board.length || action.payload.column > state.board.length) 
            // {
            //     // skip if out of bounds
            //     return state
            // }
            let location = new Point(action.payload.row, action.payload.column)
            state.board.clickCell(location)
            let newData = {
                board: state.board.duplicate()
            }
            if (state.board.getCell(location).isMine()) newData.status = status.LOST 
            let obj = Object.assign({}, 
                state, newData
            );
            return obj;
        }
    }

    // default
    return state
}

/*
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
            // console.log("finding", i, j, (_.find(others, new Point(i,j)) !== undefined ))
            if (i === row && j === column || _.find(others, new Point(i,j)) !== undefined) {
                newAttributes.clicked = true;
            } 
            return Object.assign({}, cell, newAttributes);
        })
    })
    return updatedBoard;
}


function getNeighbours(board, row, column) {
    if (board[row][column].value === "1") return []
    let found = []
    let todo = []
    if (board[row][column].value === "0") todo.push(new Point(row,column))
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

*/
