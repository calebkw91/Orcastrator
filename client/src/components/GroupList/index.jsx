import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import ListGroup from "react-bootstrap/ListGroup"
import API from "../../utils/API";

function GroupList(props) {
  const [groups, setGroups] = useState([]);
  const { id, name } = useContext(UserContext);

  useEffect(() => {
    //get all groups
    API.getGroups().then((res) => {
        //only keep ones that you are a member of
      setGroups(res.data.filter(group => group.users.includes(id)));
    });
  }, [props.modalShow, id]);

  const handleGroupOnClick = (event) => {
    console.log(event.target.id);
    console.log(groups.filter(group => group.id === event.target.id))
  }

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
        <h3>{name}'s Groups</h3>
      <div className="row">
        <ListGroup className="col">{groups.map(g => {
            return(<ListGroup.Item key={g.id} onClick={handleGroupOnClick}>{g.name}</ListGroup.Item>)
        })}</ListGroup>
      </div>
    </div>
  );
}

export default GroupList;
