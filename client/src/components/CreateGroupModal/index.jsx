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
          <div className="container">
            <div className="row">
              <Form.Control size="lg" type="text" placeholder="Pod Name" />
            </div>
            <br />
            <div className="row">
              <Form.Control type="text" placeholder="Pod Description" />
            </div>
          </div>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onFormSubmit} type="submit">
            Save
          </Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GroupAdd;
