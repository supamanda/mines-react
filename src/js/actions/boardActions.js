import { MineCell } from '../shared/mineCell'

export function fetchBoard() {
    return {
        type: "FETCH_NEW_BOARD_FULFILLED",
        payload: {
            board: createNewBoard()
        }
    }
}

function createNewBoard() {
    console.log("creating new board")
    return [
        [new MineCell("0",Math.random()*10 >= 5), new MineCell("1",false), new MineCell("*",false)],
        [new MineCell("0",false), new MineCell("1",false), new MineCell("1",false)],
        [new MineCell("0",false), new MineCell("0",false), new MineCell("0",false)],
    ]
}

export function clickCell(row, column) {
    return {
        type: "CLICKED_CELL",
        payload: {
            row: row,
            column: column,
        }
    }
}