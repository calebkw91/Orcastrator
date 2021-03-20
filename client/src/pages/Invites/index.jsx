import React from "react";
import GroupInvites from "../../components/GroupInvites/index"
import "./style.css";

function Invites() {

    return(
        <div className="login">
        <h1>Invite List</h1>
        <GroupInvites/>
        </div>
    )
}

export default Invites;