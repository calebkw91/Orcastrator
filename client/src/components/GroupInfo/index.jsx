import React, { useEffect, useState } from "react";
import API from "../../utils/API";

function GroupInfo(props) {
  let socketstyle = {
    position: "relative",
    top: "5em",
  };

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    API.getGroups().then((res) => {
      console.log("api call", res);
      setGroups(res.data);
    });
    console.log("groups", groups);
  }, []);

  return (
    <div className="col-lg-6 col-sm-12 col-md-12">
      <div className="row">
        <h3>Currently Selected group information goes here</h3>
      </div>
      <div className="row">
        <h3 style={socketstyle}>socket for group chat</h3>
      </div>
    </div>
  );
}

export default GroupInfo;
