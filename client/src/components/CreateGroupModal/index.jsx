import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function GroupAdd(props) {

  const [groupProperties, setGroupProperties] = useState([]);

  const [currentProperty, setCurrentProperty] = useState("");

  const addProperty = (event) => {
    event.preventDefault();
    console.log(groupProperties);
    setGroupProperties([...groupProperties, currentProperty]);
  };

  const handleInputChange = (event) => {
    setCurrentProperty(event.target.value);
    console.log(currentProperty);
  };

  const deleteProperty = (event) => {
    event.preventDefault();
    const target=event.target.value;
    setGroupProperties(groupProperties.filter( property => property !== target));
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
              <br />
              <div className="row">
                <Form.Control type="text" onChange={handleInputChange} placeholder="Required Group Property" />
                <button onClick={addProperty}>Add Property</button>
              </div>
              <div className="row">
                <h5>Current Properties:</h5>
                <br/>
                <ul>
                  {groupProperties.map(property =>
                    <li>{property}<button className="deleteButton" value={property} onClick={deleteProperty}>X</button></li>                   
                  )}
                </ul>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleFormSubmit} type="submit">
            Save
          </Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GroupAdd;
