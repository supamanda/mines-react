import React from "react"

export class Cell extends React.Component {
    // const divStyle = {
    //     border: "1px solid #000000",
    // };

    render() {
        return (
                <td>
                    <button 
                        disabled={this.props.clicked} 
                        onClick={this.props.clickCell.bind(this, this.props.row, this.props.column)}
                    >
                        {this.props.value} {this.props.clicked + ""}
                    </button>
                </td>
            );
    }
}
