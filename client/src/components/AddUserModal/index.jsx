import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../../utils/API"

function AddUserModal(props) {

    let [user, setUser] = useState();

    const inviteUser = (event) => {
        event.preventDefault();

        API.getUsername(user)
            .then((res) => {
                if (res.data) {
                    if(res.data.invites.indexOf(props.currentGroup._id) !== -1){
                        alert("User is already invited");
                    } else if(res.data.groups.indexOf(props.currentGroup._id) !== -1){
                        alert("User is already in the group");
                    } else {
                        res.data.invites.push(props.currentGroup._id);
                        API.userUpdate(res.data._id, res.data)
                            .then((res) => {
                                alert("Invite Sent");
                            });
                    }
                } else {
                    alert("User does not exist");
                };
            });
    };

    const handleInputChange = (event) => {
        setUser(event.target.value);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add an Orca:
        </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group controlId="groupName">
                        <div className="container">
                            <div className="row">
                                <Form.Control size="lg" type="text" placeholder="Orca Name" onChange={handleInputChange} />
                            </div>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={inviteUser} type="submit">
                        Invite
                    </Button>
                    <Button onClick={props.onHide} >Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddUserModal;
