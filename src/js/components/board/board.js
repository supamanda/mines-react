import React from "react"
import EventEmitter from "events"
import { Cell } from "./cell"

// if you export class Blah, you import {Blah} from file
// if you export default class Blah, you import Blah from file
//https://codereviewvideos.com/blog/warning-react-createelement/
export class Board extends React.Component {
    constructor() {
        super()
        this.eventEmitter = new EventEmitter()
        this.eventEmitter.emit("something")
    }

    render() {
        console.log(EventEmitter.listenerCount(this.eventEmitter, 'something'));
        const { board } = this.props;
        if (board.length > 2) console.log("Amanda " + board[2][2].clicked);
        const cells = board.map((row, i) => {
            var aRow = row.map((cell, j) => (<Cell key={i+"_"+j} clicked={cell.clicked} value={cell.value} row={i} column={j} eventEmitter={this.eventEmitter} />))
            return (<tr key={"row"+i} >{aRow}</tr>);
        })
        return ( 
            <table><tbody>{cells}</tbody></table>
        )
    }
}