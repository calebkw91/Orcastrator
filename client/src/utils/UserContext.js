import React from "react";

const UserContext = React.createContext({
    id: "",
    name: "",
    portrait: ""
});

export default UserContext;