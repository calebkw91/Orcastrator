import {React, useContext} from "react";
import CreateGroupForm from "../../components/CreateGroupForm";
import UserContext from "../../utils/userContext";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import UserInfo from "../../components/UserInfo";

function Dashboard(props){

    const { id, name, portrait } = useContext(UserContext);


    return(
        <div>
            <UserInfo />
            <Footer />
            {/* user info in the navbar */}
        {/* display group info on page */}
        <div className="row">
            <CreateGroupForm />
            <GroupInfo />
        </div>
        {/* display group making form on page - later put into a separate tab/page/whatever*/}
        {/* later - display other groups */}
        </div>
    );
}

export default Dashboard;