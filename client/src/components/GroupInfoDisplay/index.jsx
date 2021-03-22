import React from "react";
import Image from "react-bootstrap/Image";
import OrcaCard from "../OrcaCard";

function GroupInfoDisplay(props) {
  //iterate through users
  return (
    <div className="row">
      <div className="col-12">
        <h4>{props.displayGroup.name}</h4>
        <h5>{props.displayGroup.description}</h5>
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
