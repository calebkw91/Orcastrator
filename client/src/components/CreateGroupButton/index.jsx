import React from "react";
import Button from "react-bootstrap/Button"
import CreateGroupModal from "../CreateGroupModal";

// button prompts a modal to show up to create a new group
function CreateGroupButton(props){
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div className="col-lg-6 col-md-6 col-sm-12">
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Create New Group
      </Button>

      <CreateGroupModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    );
}

export default CreateGroupButton;