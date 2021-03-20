import React, { useContext } from "react";
import Button from "react-bootstrap/Button"
import CreateGroupModal from "../CreateGroupModal";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";



// button prompts a modal to show up to create a new group
function CreateGroupButton(props) {
  const { id, name, portrait } = useContext(UserContext);
  const properties = [];

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = event.target.form
      console.log("here",data.length)
      console.log(event)
      const formLength = await data.length
      if (formLength > 7) {
        for (let i = 5; i < formLength - 2; i++) {
          const property = data[i].attributes[1].value
          const value = data[i].attributes[2].value
          const object ={[property]:value}
          properties.push(object);
        };
        console.log("properties",properties);
      }
      else {
        console.log("no  props")
      }
      const user = {id:id, name:name, properties:properties, portrait:portrait };

      let newGroup = {
        name: data[0].value,
        admin: id,
        description: data[1].value,
        users: [id],
        properties: properties,
        fullUsers:[user]
      };
      console.log(newGroup);
      await API.saveGroup(newGroup, id);
      await props.setModalShow(false);
    } catch (err) {
      throw err;
    }

  };

  return (
    <div>
      <Button variant="primary" onClick={() => props.setModalShow(true)}>
        Create New Group
        </Button>

      <CreateGroupModal
        show={props.modalShow}
        handleFormSubmit={handleFormSubmit}
        onHide={() => props.setModalShow(false)}
      />
    </div>
  );
}

export default CreateGroupButton;