import React, {useState} from "react";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import GroupList from "../../components/GroupList";
import UserInfo from "../../components/UserInfo";
import "./style.css";
import ChatWindow from "../../components/ChatStuffs/ChatWindow";


function Dashboard(props) {

    const [modalShow, setModalShow] = useState(false);
    const [currentGroup, setCurrentGroup] = useState({name:"Nothing to Display", description: "", fullUsers:[], id:""});
    

    return (
        <div>
            <UserInfo logout = {props.logout}/>
            <br></br>

            <div className="container">
                <div className="row">
                    <GroupInfo displayGroup={currentGroup}/>
                    <GroupList currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} setModalShow={setModalShow} modalShow={modalShow}/>
                </div>
                <div>
                    <ChatWindow currentGroup={currentGroup.name} UserContext={props.UserContext}/>
                </div>
            {/* display group making form on page - later put into a separate tab/page/whatever*/}
            {/* later - display other groups */}
            </div>
            <Footer />
        </div> 
    );
}

export default Dashboard;