import React, {useContext} from "react";
import Button from "react-bootstrap/Button"
import CreateGroupModal from "../CreateGroupModal";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";



// button prompts a modal to show up to create a new group
function CreateGroupButton(props){
    const {id} = useContext(UserContext);

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      console.log("saving group");

      let newGroup = {
        name: event.target.form[0].value,
        admin: id,
        description: event.target.form[1].value,
        users: [id]
      };
  
      API.saveGroup(newGroup, id)
        .then(props.setModalShow(false))
        .catch((err) => console.log(err));
    };

    return(
        <div>
        <Button variant="primary" onClick={() => props.setModalShow(true)}>
        Create New Group
        </Button>

      <CreateGroupModal
        show={props.modalShow}
        handleFormSubmit={handleFormSubmit}
        onHide={() => props.setModalShow(false)}
      />
      </div>
    );
}

export default CreateGroupButton;