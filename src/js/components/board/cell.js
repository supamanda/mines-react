import React from "react"

import { connect } from "react-redux"


import { clickCell } from "../../actions/boardActions"
import { fetchBoard } from "../../actions/boardActions"

// need to add connect so it can dispatch the click cell action
@connect((store) => { return {
        board: store.board.board,
    };})
export class Cell extends React.Component {
    // const divStyle = {
    //     border: "1px solid #000000",
    // };
// {this.props.value} {this.props.row} {this.props.column}
    
    constructor() {
        super()
        console.log(this.props)
    }

    componentWillMount() {
        this.props.eventEmitter.on('neighbour', 
            (row, column) => {
                if (!this.props.clicked && 
                    this.isNeighbour(row, column, this.props.row, this.props.column)) {
                    // this.click()
                    console.log(this.props.clicked + " " + row + " " + column + " " + this.props.row + " " + this.props.column)
                    // this.click()
                }
            })
    }

    isNeighbour(neighbourRow, neighbourColumn, yourRow, yourColumn) {
        let neighbourRowInt = parseInt(neighbourRow)
        let neighbourColumnInt = parseInt(neighbourColumn)
        let yourRowInt = parseInt(yourRow)
        let yourColumnInt = parseInt(yourColumn)

        let rowDist = Math.abs(neighbourRowInt - yourRowInt)
        let colDist = Math.abs(neighbourColumnInt - yourColumnInt)

        return (rowDist === 1 && colDist <= 1) || (rowDist === 0 && colDist === 1)
    }

    componentWillUnmount() {
        
    }

    click() {
        console.log("clicked cell " + this.props.row + ", " + this.props.column);
        this.props.dispatch(clickCell(this.props.row, this.props.column));
        if (this.props.value === 0) {
            for (i = -1; i <= 1; i++) {
                this.props.dispatch(clickCell(this.props.row))
            }
        }

        if (this.props.value === "0") {
            this.props.eventEmitter.emit('neighbour', this.props.row, this.props.column)
        }
        // this.props.dispatch(fetchBoard())
    }

    render() {
        // console.log("Amanda " + this.props.clicked);
        return (
                <td>{this.props.key}<button disabled={this.props.clicked} onClick={this.click.bind(this)}>{this.props.value} {this.props.clicked + ""}</button></td>
            );
    }
}