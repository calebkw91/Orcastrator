import React, {useEffect, useState} from "react";
import API from "../../utils/API";
function GroupInvites () {


    const [groups, setGroups] = useState([]);
    
    useEffect( () => {
        API.getGroups()
        .then((res) => {
        console.log("api call",res);
        setGroups(res.data)
        })
        console.log("groups",groups);
    },[]);

    return(
        <table className="table">
            <thead>
                <tr className="tableHead">
                    <th>Name</th>
                    <th>Group Leader</th>
                    <th>Description</th>
                    <th>Current Members</th>
                    <th>Response</th>
                </tr>
            </thead>
            <tbody>
                {groups.map(group =>
                    <tr key={group.name}>
                        <td>{group.name}</td>
                        {/* <td>{group.admin.name}<img alt="adminportrait" src={group.admin.portrait}></img></td> */}
                        <td>{group.description}</td>
                        <td>{group.members.map(member =>
                          <p>{member.name}</p>
                          )}</td>
                    </tr>)}
            </tbody>
        </table>
    );
};

export default GroupInvites