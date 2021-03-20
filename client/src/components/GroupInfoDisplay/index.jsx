import React from "react";
import OrcaCard from "../OrcaCard";

function GroupInfoDisplay(props) {
  //iterate through users

  console.log("displaygroup: ", props.displayGroup);

  return (
    <div className="row">
      <div className="col-12">
        <p>{props.displayGroup.name}</p>
        <p>{props.displayGroup.description}</p>
        <div className={"row"}>
          {props.displayGroup.fullUsers.map((user) => {
            return <OrcaCard user={user} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default GroupInfoDisplay;
