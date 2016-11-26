import React from "react"
import { connect } from "react-redux"

import { fetchBoard, clickCell } from "../actions/boardActions"

import { Header } from "./header"

import { Board } from "./board/board"

@connect((store) => {
    return {
        board: store.boardReducer.board,
        status: store.boardReducer.status
    };
})
export default class Layout extends React.Component {

    newGame() {
        console.log("fetching a new board")
        this.props.dispatch(fetchBoard())
    }

    clickCell(row, column) {
        console.log("clicked cell " + row + ", " + column);
        this.props.dispatch(clickCell(row, column));
    }

    render() {
        const { board, status } = this.props;
        console.log("rendering the board ", board, this.clickCell)
        const amanda = "Amanda the board has changed"
        
        return ( 
            <div>
                <Header title={status} />
                <Board board={board} clickCell={this.clickCell.bind(this)} />
                <button onClick={this.newGame.bind(this)}>New game</button>
                
            </div>
        );
    }
}