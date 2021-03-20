import React from "react";
import Image from "react-bootstrap/Image";

function GroupInfoDisplay(props) {
  
  //iterate through users

  console.log("displaygroup: ", props.displayGroup);

    return (
      <div>
        <p>{props.displayGroup.name}</p>
        <p>{props.displayGroup.description}</p>
        <ul>
          {props.displayGroup.fullUsers.map(user => {
            return <li>{user.name} <Image style={"maxHeight"="1rem"} src={user.portrait} alt={`${user.name}'s portrait`}></Image><ul>
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
