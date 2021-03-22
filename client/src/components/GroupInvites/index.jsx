import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import AcceptInviteModal from "../AcceptInviteModal/"
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import "./style.css";


function GroupInvites() {
    const { id, invites, portrait } = useContext(UserContext);
    const [activeInvites, setInvites] = useState(invites);
    const [groups, setGroups] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({ userID: "" });

    const getInvites = async () => {
        try {
            if (activeInvites.length >= 1) {
                let newGroupsArr = [];
                for (let i = 0; i < invites.length; i++) {
                    let newGroup = await API.getGroup(invites[i]);
                    let newGroupAdmin = newGroup.data.admin;
                    let adminCall = await API.getUser(newGroupAdmin);
                    let adminName = adminCall.data.name;
                    newGroup.data.admin = adminName;
                    newGroupsArr.push(newGroup);
                }
                setGroups(newGroupsArr);
            } else {
                setGroups([]);
            }
        } catch (err) {
            throw err;
        }
    }

    const accept = (event) => {
        API.getGroup(event.target.attributes[0].value)
            .then((res) => {
                if (res.data.properties.length >= 1) {
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
                            let newInvites = activeInvites;
                            const index = newInvites.indexOf(event.target.value);
                            if (index > -1) {
                                newInvites.splice(index, 1);
                                setInvites(newInvites);
                            }

                            API.userUpdate(id, { invites: newInvites })
                                .then((res) => {
                                    getInvites();
                                });
                        });
                };
            });
    };


    const decline = (event) => {
        let newInvites = activeInvites;
        const index = newInvites.indexOf(event.target.value);
        if (index > -1) {
            newInvites.splice(index, 1);
            setInvites(newInvites);
        }

        API.userUpdate(id, { invites: newInvites })
            .then((res) => {
                console.log("invites updated");
                getInvites();
            });
    };

    const redirect = () => {
        window.location.assign("/");
    };

    useEffect(() => {
        getInvites();
    }, []);

    return (
        <Container fluid>
            <h1 className="inviteHeader">Pod Invites</h1>
            <div className="row">
            <Table striped bordered hover size="sm" className="col-12">
                <thead>
                    <tr className="tableHead">
                        <th>Name</th>
                        <th>Group Leader</th>
                        <th>Description</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(group =>
                        <tr key={group.data._id}>
                            <td>{group.data.name}</td>
                            <td>{group.data.admin}</td>
                            <td>{group.data.description}</td>
                            <td>
                                <Button className="responseButtons" onClick={accept} value={group.data._id}>Accept</Button>
                                <Button className="responseButtons" onClick={decline} value={group.data._id}>Decline</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button className="dashboardButton" onClick={redirect}>Dashboard</Button>

            <AcceptInviteModal
                portrait={portrait}
                invites={invites}
                data={modalData}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            </div>
        </Container>
    );
};

export default GroupInvites