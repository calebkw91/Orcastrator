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
    console.log(props.modalShow);
    console.log("groups updated");
    //get all groups
    API.getUserGroups(id).then((res) => {
      //only keep ones that you are a member of
      //setGroups(res.data.filter(group => group.users.includes(id)));
      setGroups(res.data.groups);
      console.log(res.data.groups);
    });
  }, [props.modalShow, id]);

  const handleGroupOnClick = (event) => {
    props.setCurrentGroup(groups.filter(g => g.name === event.target.innerHTML)[0]);
  }

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      <div className="row">
        <h3>{name}'s Groups</h3>
        <br/>
        <div>
        <CreateGroupButton modalShow={props.modalShow} setModalShow={props.setModalShow}/>
        </div>
      </div>
      <div className="row">
        <ListGroup key={shortid.generate()} className="col">
            {groups.map(g => <ListGroup.Item key={shortid.generate()} action onClick={handleGroupOnClick}>{g.name}</ListGroup.Item>)}
        </ListGroup>
      </div>
    </div>
  );
}

export default GroupList;
