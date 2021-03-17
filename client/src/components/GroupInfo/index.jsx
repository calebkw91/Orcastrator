import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

function GroupInfo(props) {
  let socketstyle = {
    position: "relative",
    top: "5em",
  };

  const [groups, setGroups] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    //get all groups
    API.getGroups().then((res) => {
        //only keep ones that you are a member of
      setGroups(res.data.filter(group => group.users.includes(id)));
    });
  }, [props.modalShow]);

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      <div className="row">
        <h3>Currently Selected group information goes here</h3>
        <p>{groups.map(g => {
            return(<div>{g.name}</div>)
        })}</p>
      </div>
      <div className="row">
        <h3 style={socketstyle}>socket for group chat</h3>
      </div>
    </div>
  );
}

export default GroupInfo;
