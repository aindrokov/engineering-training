import React from "react";

class ListItem extends React.Component {
    constructor(props) {
      super(props);
      }
      render() {
        return (
          <li className="item"><a href={this.props.link}> 
          <i className={this.props.icon}>
          </i>{this.props.title} 
          </a></li>
        );
      }
  }
  
  export default ListItem;