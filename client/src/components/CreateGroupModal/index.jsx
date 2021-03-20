import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function GroupAdd(props) {

  const [groupProperties, setGroupProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState("");
  const [currentPropertyValue, setCurrentPropertyValue] = useState("");

  const addProperty = (event) => {
    event.preventDefault();
    setGroupProperties([...groupProperties, {[currentProperty]:currentPropertyValue}]);
  };

  const handleInputChange = (event) => {
    if(event.target.name === "property"){
      setCurrentProperty(event.target.value);
    }
    else{
      setCurrentPropertyValue(event.target.value)
    }
  };

  const deleteProperty = (event) => {
    event.preventDefault();
    console.log(event)
    const prop=event.target.attributes.prop.value;
    setGroupProperties(groupProperties.filter( property => Object.keys(property)[0] !== prop));
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
                <Form.Control className="col-6" type="text" name="property" onChange={handleInputChange} placeholder="Required Group Property" />
                <Form.Control className="col-6" type="text" name="propertyValue" onChange={handleInputChange} placeholder="Your Property Value" />
                {/* groupProperties is an array of objects */}
                <Button onClick={addProperty}>Add Property</Button>
              </div>
              <div className="row">
                <h5>Current Properties:</h5>
                <br/>
                <ul>
                  {groupProperties.map(property =>
                    <li>{Object.keys(property)[0]} : {Object.values(property)[0]}<button className="deleteButton" prop={Object.keys(property)[0]} propvalue={Object.values(property)[0]}  onClick={deleteProperty}>X</button></li>                   
                  )}
                </ul>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={props.handleFormSubmit} type="submit">
            Save
          </Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GroupAdd;
