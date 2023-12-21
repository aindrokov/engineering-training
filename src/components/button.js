import React from "react";
import utils from "../utils";
import store from "../store";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { dataLoaded } = store.getState().dataLoaded;
    console.log("Clicked!");
    if (dataLoaded) {
      return;
    }
    store.dispatch({ type:"DATA_LOADING", loading: true })
    utils.loadData(() => {
      store.dispatch({type:"TOGGLE_DATALOADED"})
      store.dispatch({type:"DATA_LOADING", loading: false })
      resolve();
    });
  }
  render() {
    return <button onClick={this.handleOnClick}>Load Data</button>;
  }
}
