import React from "react";

const UserContext = React.createContext({
    id: "",
    firstName: "",
    lastName: "",
    portrait: ""
});

export default UserContext;