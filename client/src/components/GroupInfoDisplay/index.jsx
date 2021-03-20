import React, {useState} from "react";
import API from "../../utils/API";

function GroupInfoDisplay(props) {
  const [user, setUser] = useState();
  
  //iterate through users

  console.log("displaygroup: ", props.displayGroup);

    return (
      <div>
        <p>{props.displayGroup.name}</p>
        <p>{props.displayGroup.description}</p>
        <ul>
          {props.displayGroup.fullUsers.map(user => {
            return <li>{user.name} <ul>
              {user.properties.map(property =>{
                return <li>{Object.getOwnPropertyNames(property).map(attr =>{
                  return<p>{attr} : {property[attr]}</p>
              })}</li>
              })}
              </ul></li>
          })}
        </ul>
      </div>
    );
}

export default GroupInfoDisplay;
