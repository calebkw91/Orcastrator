import React from "react";
import CreateGroupForm from "../../components/CreateGroupForm";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import UserInfo from "../../components/UserInfo";

function Dashboard(props){

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