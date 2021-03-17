import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddUserModal from "../AddUserModal";
import GroupInfoDisplay from "../GroupInfoDisplay";

function GroupInfo(props) {
  const [modalShow, setModalShow] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    props.setModalShow(false);
  };


  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      <h3>Here's some info about your currently selected group</h3>
        <GroupInfoDisplay displayGroup={props.displayGroup}/>
      <Button onClick={() =>setModalShow(true)}>Add a new Orca</Button>
      <AddUserModal
        show={modalShow}
        handleFormSubmit={handleFormSubmit}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default GroupInfo;
