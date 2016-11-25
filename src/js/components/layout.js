import React from "react"
import { connect } from "react-redux"

import { fetchBoard, clickCell } from "../actions/boardActions"

import { Header } from "./header"

import { Board } from "./board/board"

@connect((store) => {
    return {
        board: store.boardReducer.board,
    };
})
export default class Layout extends React.Component {
    constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

    newGame() {
        console.log("fetching a new board")
        this.props.dispatch(fetchBoard())
    }

    clickCell(row, column) {
        console.log("clicked cell " + row + ", " + column);
        this.props.dispatch(clickCell(row, column));
    }

    render() {
        const { board } = this.props;
        console.log("rendering the board ", board, this.clickCell)
        const amanda = "Amanda the board has changed"
        
        return ( 
            <div>
                <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
                <Board board={board} clickCell={this.clickCell.bind(this)} />
                <button onClick={this.newGame.bind(this)}>New game</button>
                
            </div>
        );
    }
}