import React from "react";

export class Header extends React.Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}