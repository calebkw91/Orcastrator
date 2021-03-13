import React from "react";
import CreateGroupButton from "../../components/CreateGroupButton";
import Footer from "../../components/Footer";
import GroupInfo from "../../components/GroupInfo";
import UserInfo from "../../components/UserInfo";
import GroupAdd from "../../components/GroupAdd";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

function Dashboard(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const handleFormSubmit = event => {
        event.preventDefault();

        let newGroup = {
            name: event.target.form[0].value,
            members: []
        }
        
        API.saveGroup(newGroup)
            .then(console.log("group saved"))
            .catch(err => console.log(err));

        setModalShow(false);
    }

    return (
        <div>
            <UserInfo />
            <Footer />
            <br></br>
            <div className="container">
            {/* user info in the navbar */}
            {/* display group info on page */}
<<<<<<< HEAD
                <div className="row">
                    <CreateGroupButton />
                    <GroupInfo />
                </div>
            {/* display group making form on page - later put into a separate tab/page/whatever*/}
            {/* later - display other groups */}
            </div>
        </div> 
=======
            <div className="row">
                <CreateGroupForm />
                <GroupInfo />
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add Group
                </Button>

                <GroupAdd
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    handleFormSubmit={handleFormSubmit}
                />
            </div>
            {/* display group making form on page - later put into a separate tab/page/whatever*/}
            {/* later - display other groups */}
        </div>
>>>>>>> 93405f8df987a83ad590ed1aad65e95e90448427
    );
}

export default Dashboard;