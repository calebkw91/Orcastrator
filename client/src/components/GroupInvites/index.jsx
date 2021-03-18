import React, {useEffect, useState, useContext} from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
function GroupInvites () {

    const {invites} = useContext(UserContext);

    const [groups, setGroups] = useState([]);

    const accept = () => {
        console.log("accept")
    };

    const decline = () => {
        console.log("decline")
    };

    const redirect = () => {
        window.location.assign("/")
    };
    
    useEffect( () => {
        const grabem = async() => {
            try{
                if (invites.length >= 1){
                    let newGroupsArr = [];
                    for(let i=0; i<invites.length; i++){
                        let newGroup = await API.getGroup(invites[i]);
                        newGroupsArr.push(newGroup);
                    }
                    setGroups(newGroupsArr);
                }
            }catch(err){
                throw err;
            }
        }
        grabem();
    },[]);

    return(
        <div>
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
                    <tr key={group.data._id}>
                        <td>{group.data.name}</td>
                        <td>{group.data.admin}</td>
                        <td>{group.data.description}</td>
                        <td>{group.data.users.map(user =>
                          <p>{user}</p>
                          )}</td>
                        <td><button onClick={accept}>Accept</button><button onClick={decline}>Decline</button></td>
                    </tr>)}
            </tbody>
        </table>
        <button onClick={redirect}>Go Back to Dashboard</button>
        </div>
    );
};

export default GroupInvites