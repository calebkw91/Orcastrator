import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function GroupAdd(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a group:
          </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group controlId="groupName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter group name" />
                    </Form.Group>

                    {/* <Form.Group controlId="groupDescription">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.handleFormSubmit} type="submit">Save</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default GroupAdd;