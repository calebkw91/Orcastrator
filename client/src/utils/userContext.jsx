import React from "react";

const UserContext = React.createContext({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    portrait: ""
});

export default UserContext;