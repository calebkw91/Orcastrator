import React from "react";

function GroupInfoDisplay(props) {
  if (props.displayGroup) {
    return (
      <div>
        <p>{props.displayGroup.name}</p>
        <p>{props.displayGroup.description}</p>
        <ul>
          {props.displayGroup.users.map((user) => {
            return <li>{user}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <p>Got Nothing</p>;
  }
}

export default GroupInfoDisplay;
