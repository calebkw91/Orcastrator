import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../../utils/API"

function AddUserModal(props) {

    let [user, setUser] = useState();

    const inviteUser = (event) => {
        event.preventDefault();

        API.getUsername(user)
            .then((res) => {
                console.log("before if", res);
                if (res.data) {
                    res.data.invites.push(props.currentGroup._id);
                    API.userUpdate(res.data._id, res.data)
                        .then((res) => {
                            alert("Invite Sent");
                        });
                } else {
                    alert("user does not exist");
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
                            <br />
                            <div className="row">
                                <Form.Control type="text" placeholder="Orca's role" />
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
