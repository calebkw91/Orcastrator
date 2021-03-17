import React from "react";

function GroupInfo(props){
    return(
        <div className="col-lg-6 col-sm-12 col-md-12">
            <h3>Here's some info about your currently selected group</h3>
            <p>{props.displayGroup.name}</p>
            <p>{props.displayGroup.description}</p>
            <ul>
                {props.displayGroup.users.map(user => {
                    return <li>{user}</li>
                })}
            </ul>
        </div>
    )
}

export default GroupInfo;