import React from "react";
import ListItem from "./listitem";
import { connect } from "react-redux";

function List(props) {
  if (!props.data.jirasObject) {
    return;
  }
  return (
    <ul className="grid-container">
      {props.data.jirasObject.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          title={item.title}
          link={item.link}
        />
      ))}
    </ul>
  );
}

function mapStateToProps(state) {
  const { data } = state.dataLoaded;
  return {
    data,
  };
}

export default connect(mapStateToProps)(List);