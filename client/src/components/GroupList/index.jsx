import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import ListGroup from "react-bootstrap/ListGroup"
import API from "../../utils/API";
import CreateGroupButton from "../CreateGroupButton";
import shortid from "shortid";

function GroupList(props) {
  const [groups, setGroups] = useState([]);
  const { id, name } = useContext(UserContext);

  useEffect(() => {
    //get all groups
    API.getUserGroups(id).then((res) => {
      //only keep ones that you are a member of
      setGroups(res.data.groups);
    });
  }, [props.modalShow, id]);

  const handleGroupOnClick = (event, idArg) => {
    props.setCurrentGroup(groups.filter(g => g._id === idArg)[0]);
  }

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      <div className="row">
        <h3>{name}'s Groups</h3>
      </div>
      <div className="row">
            <CreateGroupButton modalShow={props.modalShow} setModalShow={props.setModalShow} />
      </div>
      <div className="row">
        <ListGroup key={shortid.generate()} className="col">
          {groups.map(g => <ListGroup.Item id={g._id} key={shortid.generate()} action onClick={(e) => handleGroupOnClick(e, g._id)}>{g.name}</ListGroup.Item>)}
        </ListGroup>
      </div>
    </div>
  );
}

export default GroupList;
