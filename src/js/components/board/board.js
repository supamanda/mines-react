import React from "react"

import { Cell } from "./cell"
import { connect } from "react-redux"

// if you export class Blah, you import {Blah} from file
// if you export default class Blah, you import Blah from file
//https://codereviewvideos.com/blog/warning-react-createelement/

export class Board extends React.Component {
    
    render() {
        console.log(this.props)
        const { board } = this.props;
        const cells = board.map((row, i) => {
            var aRow = row.map((cell, j) => {
                return (
                    <Cell 
                        key={i+"_"+j} 
                        clicked={cell.clicked} 
                        value={cell.value} 
                        row={i} 
                        column={j}
                        clickCell={this.props.clickCell.bind(this)}
                    />)
            })
            return (<tr key={"row"+i} >{aRow}</tr>);
        })
        return ( 
            <table class="board">
                <tbody>{cells}</tbody>
            </table>
        )
    }
}
