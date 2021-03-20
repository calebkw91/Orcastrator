import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../../utils/API"
import UserContext from "../../utils/UserContext";

function AcceptInviteModal(props) {
    const groupID = props.data.groupID;
    const invites = props.invites;
    const [groupProperties,setGroupProperties] = useState([]);
    const { id, name, portrait } = useContext(UserContext);

    const handleInputChange = (event) => {
        console.log(event);
        const prop = event.target.attributes[0].value;
        const tempProps = groupProperties;
        const index = tempProps.findIndex(property => Object.keys(property)[0] === prop);
        tempProps[index] = {[prop]:event.target.value};
    };

    const user = {id:id, properties:groupProperties, portrait:portrait, name:name};
    
    const data = {
        userID: id,
        groupID: groupID,
        fullUsers: user
    }

    const submitProperties = async (event) => {
        try {
            event.preventDefault();
            await API.newSaveUserToGroup(data);
            const newInvites = await invites.filter(invite => invite !== groupID);
            await API.userUpdate(id, { invites: newInvites })
            console.log("user saved");
            props.onHide();
            window.location.assign("/");
        } catch (err) {
            throw err;
        }
        
        
    }

    useEffect(() => {
        API.getGroup(groupID)
        .then((res) => {
            if(res.data.properties.length > 0){
                const properties = res.data.properties;
                setGroupProperties([...properties,]);
                console.log(groupProperties);
            }
            else{
                console.log("no properties")
            }
        })
        
    },[props.show])

    return (


        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Group Paramaters Are Required:
        </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                {groupProperties.map(property => 
                <div>
                    <h4>{Object.keys(property)[0]}:</h4>
                    <Form.Control prop={Object.keys(property)[0]} size="lg" type="text" placeholder="Required" onChange={handleInputChange} />
                    </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitProperties} type="submit">
                        Join
                    </Button>
                    <Button onClick={props.onHide} >Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default AcceptInviteModal;