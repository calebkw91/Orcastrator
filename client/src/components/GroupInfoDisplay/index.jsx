import React from "react";

function GroupInfoDisplay(props) {
  console.log(props.displayGroup);
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
}

export default GroupInfoDisplay;
