import React, { useContext } from "react";
import Button from "react-bootstrap/Button"
import CreateGroupModal from "../CreateGroupModal";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";



// button prompts a modal to show up to create a new group
function CreateGroupButton(props) {
  const { id } = useContext(UserContext);
  const properties = [];
  const propValues = [];

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const formLength = await event.target.form.length
      if (formLength > 6) {
        for (let i = 4; i < formLength - 2; i++) {
          properties.push(event.target.form[i].value);
          propValues.push(prompt("Your " + event.target.form[i].value + " :"))
        };
        console.log("properties",properties);
        console.log("propValues",propValues);
      }
      else {
        console.log("no  props")
      }
      const user = {id:id, properties:properties, propValues:propValues};

      let newGroup = {
        name: event.target.form[0].value,
        admin: id,
        description: event.target.form[1].value,
        users: [id],
        properties: properties,
        fullUsers:[user]
      };

      API.saveGroup(newGroup, id);
      props.setModalShow(false);
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