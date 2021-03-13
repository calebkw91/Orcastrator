import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button"
import GroupAdd from "../GroupAdd";
import API from "../../utils/API";
import UserContext from "../../utils/userContext";



// button prompts a modal to show up to create a new group
function CreateGroupButton(props){
    const { id, name, portrait } = useContext(UserContext);


    const [modalShow, setModalShow] = useState(false);

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      let newGroup = {
        name: event.target.form[0].value,
        admin: id,
        description: event.target.form[1].value,
        members: [{name: event.target.form[2].value, role: event.target.form[3].value}]
      };
  
      API.saveGroup(newGroup)
        .then(console.log("group saved"))
        .catch((err) => console.log(err));
  
      setModalShow(false);
    };

    return(
        <div className="col-lg-6 col-md-6 col-sm-12">
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Create New Group
      </Button>

      <GroupAdd
        show={modalShow}
        handleFormSubmit={handleFormSubmit}
        onHide={() => setModalShow(false)}
      />
      </div>
    );
}

export default CreateGroupButton;