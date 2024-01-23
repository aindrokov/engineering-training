import React from "react";
import ListItem from "./listitem";


export default class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = {
      "jirasObject": [{
          "icon": "bi bi-check-circle-fill",
          "title": "Conditional equality check",
          "link": "https://totalwine.atlassian.net/browse/DIG-71865"
      }, {
          "icon": "bi bi-check-circle-fill",
          "title": "Object Methods, and using 'this'",
          "link": "https://totalwine.atlassian.net/browse/DIG-71886"
      }, {
          "icon": "bi bi-check-circle-fill",
          "title": "JavaScript Classes using 'this'",
          "link": "https://totalwine.atlassian.net/browse/DIG-71939"
      }]
  }
      return (
        <ul className="grid-container">{data.jirasObject.map((jirasObject, index) => (
          <ListItem key={index} icon={jirasObject.icon} title={jirasObject.title} link={jirasObject.link}/>
        ))}</ul>
      );
    }
  }