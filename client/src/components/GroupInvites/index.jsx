import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
function GroupInvites() {

    const { id, invites } = useContext(UserContext);
    const [activeInvites, setInvites] = useState(invites);
    const [groups, setGroups] = useState([]);

    const accept = (event) => {
        console.log("accept");

        let data = {
            userID: id,
            groupID: event.target.value
        }

        API.saveUserToGroup(data)
            .then((res) => {
                console.log("user saved to group");

                let newInvites = activeInvites;
                const index = newInvites.indexOf(event.target.value);
                if (index > -1) {
                    newInvites.splice(index, 1);
                    setInvites(newInvites);
                }

                API.userUpdate(id, { invites: newInvites })
                    .then((res) => console.log("invites updated"));

            });
    };

    const decline = (event) => {
        console.log("decline");
        let newInvites = activeInvites;
        const index = newInvites.indexOf(event.target.value);
        if (index > -1) {
            newInvites.splice(index, 1);
            setInvites(newInvites);
        }

        API.userUpdate(id, { invites: newInvites })
            .then((res) => console.log("invites updated"));
    };

    const redirect = () => {
        window.location.assign("/");
    };

    useEffect(() => {
        const grabem = async () => {
            try {
                if (activeInvites.length >= 1) {
                    let newGroupsArr = [];
                    for (let i = 0; i < invites.length; i++) {
                        let newGroup = await API.getGroup(invites[i]);
                        newGroupsArr.push(newGroup);
                    }
                    setGroups(newGroupsArr);
                }
            } catch (err) {
                throw err;
            }
        }
        grabem();
    }, [activeInvites, invites]);

    return (
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
                                <p key={user}>{user}</p>
                            )}</td>
                            <td>
                                <button onClick={accept} value={group.data._id}>Accept</button>
                                <button onClick={decline} value={group.data._id}>Decline</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
            <button onClick={redirect}>Go Back to Dashboard</button>
        </div>
    );
};

export default GroupInvites