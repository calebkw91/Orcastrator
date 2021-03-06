import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddUserModal from "../AddUserModal";
import GroupInfoDisplay from "../GroupInfoDisplay";
import shortid from "shortid";


function GroupInfo(props) {
  const [modalShow, setModalShow] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setModalShow(false);
  };

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      { (props.displayGroup._id) ? <Button onClick={() =>setModalShow(true)}>Add a new Orca</Button> : <div />}
      <GroupInfoDisplay key={shortid.generate()} displayGroup={props.displayGroup}/>
      <AddUserModal
        currentGroup={props.displayGroup}
        show={modalShow}
        handleFormSubmit={handleFormSubmit}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default GroupInfo;
