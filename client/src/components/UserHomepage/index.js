import React, { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../utils/userContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PodDisplay from "../PodDisplay/index";



function UserHomepage(props) {

    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        portrait: ""
    });

    useEffect(() => {
        axios.get("/User")
            .then((res) => {
                console.log(res);
                setUser(...user, {
                    id: res.data.id,
                    firstName: res.data.givenName,
                    lastName: res.data.name.familyName,
                    portrait: res.data.photos[0].value
                });
                console.log(user);
                console.log(res.data.givenName)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <UserContext.Provider value={user}>
                <div>
                    <h1>UserHomepage Page</h1>
                    <h1>{user.firstName}</h1>
                </div>
        </UserContext.Provider>
    )

}


export default UserHomepage;