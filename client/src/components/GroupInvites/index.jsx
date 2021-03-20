import { set } from "mongoose";
import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import AcceptInviteModal from "../AcceptInviteModal/"
import { Modal, Button, Form } from "react-bootstrap";


function GroupInvites() {
    const { id, invites } = useContext(UserContext);
    const [activeInvites, setInvites] = useState(invites);
    const [groups, setGroups] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({ userID: "" });

    let updateInvites = false;

    console.log("main activeInvites " + activeInvites);
    console.log("main invites " + invites);

    const accept = (event) => {
        console.log("here", event);
        API.getGroups(event.target.id)
            .then((res) => {
                console.log(res)
                if (res.data[0].properties.length <= 1) {
                    setModalData(
                        {
                            userID: id,
                            groupID: event.target.value
                        }
                    )
                    setModalShow(true);

                }
                else {
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
                                console.log("activeInvites " + activeInvites);
                            }

                            API.userUpdate(id, { invites: newInvites })
                                .then((res) => {
                                    console.log("invites updated");
                                    updateInvites = true;
                                });

                        });
                };
            });
    };


    const decline = (event) => {
        console.log("decline");
        let newInvites = activeInvites;
        const index = newInvites.indexOf(event.target.value);
        if (index > -1) {
            newInvites.splice(index, 1);
            setInvites(newInvites);
            console.log("activeInvites " + activeInvites);
        }

        API.userUpdate(id, { invites: newInvites })
            .then((res) => {
                console.log("invites updated");
                updateInvites = true;
            });
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
    }, [updateInvites, invites, activeInvites.length]);

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
                            )}
                            </td>
                            <td>
                                <button onClick={accept} value={group.data._id}>Accept</button>
                                <button onClick={decline} value={group.data._id}>Decline</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={redirect}>Go Back to Dashboard</button>

            <AcceptInviteModal
                invites={invites}
                data={modalData}
                // currentGroup={props.displayGroup}
                show={modalShow}
                // handleFormSubmit={handleFormSubmit}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default GroupInvites