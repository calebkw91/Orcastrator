import React, {useContext, useState, useEffect } from "react";
import CreateGroupButton from "../../components/CreateGroupButton";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import UserInfo from "../../components/UserInfo";
import UserContext from "../../utils/UserContext";
import "./style.css";


function Dashboard(props) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <UserInfo />
            <button onClick={props.logout}>Logout</button>
            <br></br>

            <div className="container">
            {/* user info in the navbar */}
            {/* display group info on page */}
                <div className="row">
                    <CreateGroupButton modalShow={modalShow} setModalShow={setModalShow}/>
                    <GroupInfo modalShow={modalShow}/>
                </div>
            {/* display group making form on page - later put into a separate tab/page/whatever*/}
            {/* later - display other groups */}
            </div>
            <Footer />
        </div> 
    );
}

export default Dashboard;