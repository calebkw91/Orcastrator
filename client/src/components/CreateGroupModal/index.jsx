import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./groupModal.css"

function GroupAdd(props) {

  const [groupProperties, setGroupProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState("");
  const [currentPropertyValue, setCurrentPropertyValue] = useState("");

  const addProperty = (event) => {
    event.preventDefault();
    setGroupProperties([...groupProperties, {[currentProperty]:currentPropertyValue}]);
    document.getElementById("propField").value = "";
    document.getElementById("propValue").value = "";
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
          Create a Pod:
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
              {/* <br /> */}
              <div className="row">
                <h5>Add Pod Required Info Fields</h5>
              </div>
              {/* <br/> */}
              <div className="row">
                <Form.Control id="propField" className="col-5 groupProperty" type="text" name="property" onChange={handleInputChange} placeholder="Required Pod Property" />
                <h4 id="colon">:</h4>
                <Form.Control id="propValue" className="col-4 groupProperty" type="text" name="propertyValue" onChange={handleInputChange} placeholder="Your Property Value" />
                {/* groupProperties is an array of objects */}
                <Button id="propButton" onClick={addProperty}>Add Property</Button>
              </div>
              <div className="row">
                <h5>Current Pod Properties:</h5>
              </div>
              <div className="row">
                <ul>
                  {groupProperties.map(property =>
                    <li className="propertyList">{Object.keys(property)[0]} : {Object.values(property)[0]}<Button variant="danger" className="deleteButton btn-sm" prop={Object.keys(property)[0]} propvalue={Object.values(property)[0]} onClick={deleteProperty}>X</Button></li>
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
