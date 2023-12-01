import React from "react";
import utils from "../utils";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataLoaded: false };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    console.log("Clicked!");
    const modalContainer = document.getElementById("modalContainer");
    if (this.state.dataLoaded) {
      return;
    }
    modalContainer.classList.toggle("hidden");

    utils.loadData(() => {
      this.setState({ dataLoaded: true });
      resolve();
    });
  }
  render() {
    return (
      <button onClick={this.handleOnClick}>
        {this.state.dataLoaded ? "Loaded" : "Open Modal"}
      </button>
    );
  }
}
