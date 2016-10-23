import React from "react"
import EventEmitter from "events"
import Cell from "./cell"
import { connect } from "react-redux"

// if you export class Blah, you import {Blah} from file
// if you export default class Blah, you import Blah from file
//https://codereviewvideos.com/blog/warning-react-createelement/

export class Board extends React.Component {
    constructor() {
        super()
        this.eventEmitter = new EventEmitter()
    }

    render() {
        // console.log(this.props)
        const { board } = this.props;
        const cells = board.map((row, i) => {
            var aRow = row.map((cell, j) => (<Cell key={i+"_"+j} clicked={cell.clicked} value={cell.value} row={i} column={j} eventEmitter={this.eventEmitter} />))
            return (<tr key={"row"+i} >{aRow}</tr>);
        })
        return ( 
            <table class="board">
                <tbody>{cells}</tbody>
            </table>
        )
    }
}

function mapStateToProps(store) {
    return {
        board: store.boardReducer.board,
    }
}

const ConnectedBoard = connect(mapStateToProps)(Board)
export default ConnectedBoard