import React, {useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../../utils/API"

function AddUserModal(props) {

  let [user,setUser] = useState();

  const inviteUser = () => {
   API.getUsername(user)
   .then((res) => {
     if(res.data === null){
       alert("User Does Not Exist!")
     }
     else{
      //  API.addUserInvite({user:user,group:group})
      console.log("this is the res",res);
     }
     
   })
   .catch((err) => {
     console.log(err);
   })
  }
  console.log("current Group",props.currentGroup)
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
            Save
          </Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddUserModal;
