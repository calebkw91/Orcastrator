import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateGroupModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Pod
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <div className="container">
            <div className="row">
              <Form.Control size="lg" type="text" placeholder="Pod Name" />
            </div>
            <br />
            <div className="row">
              <Form.Control type="text" placeholder="Pod Description" />
            </div>
            <br />
            <div className="row">
                <div className="col-6">
                    <Form.Control size="sm" type="text" placeholder="Member Name" />
                </div>
                <div className="col-6">
                    <Form.Control size="sm" type="text" placeholder="Role" />
                </div>
            </div>
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateGroupModal;
