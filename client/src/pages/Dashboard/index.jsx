import {React, useContext } from "react";
import CreateGroupButton from "../../components/CreateGroupButton";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import UserInfo from "../../components/UserInfo";
import UserContext from "../../utils/UserContext";


function Dashboard(props) {
    const { id, name, portrait } = useContext(UserContext);

    return (
        <div>
            <UserInfo />
            <button onClick={props.logout}>Logout</button>
            <Footer />
            <br></br>
            <div className="container">
            {/* user info in the navbar */}
            {/* display group info on page */}
                <div className="row">
                    <CreateGroupButton />
                    <GroupInfo />
                </div>
            {/* display group making form on page - later put into a separate tab/page/whatever*/}
            {/* later - display other groups */}
            </div>
        </div> 
    );
}

export default Dashboard;