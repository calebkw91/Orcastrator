import React from "react";
import Image from "react-bootstrap/Image";
import OrcaCard from "../OrcaCard";

function GroupInfoDisplay(props) {
  
  //iterate through users

  console.log("displaygroup: ", props.displayGroup);

    return (
      <div>
        <p>{props.displayGroup.name}</p>
        <p>{props.displayGroup.description}</p>
        <ul>
          {props.displayGroup.fullUsers.map(user => {
            return <OrcaCard user={user}/>
          })}
        </ul>
      </div>
    );
}

export default GroupInfoDisplay;
