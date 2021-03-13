import React from "react";
import Button from "react-bootstrap/Button"
import GroupAdd from "../GroupAdd";
import API from "../../utils/API";


// button prompts a modal to show up to create a new group
function CreateGroupButton(props){
    const [modalShow, setModalShow] = React.useState(false);

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      let newGroup = {
        name: event.target.form[0].value,
        members: [event.target.form[2].value],
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