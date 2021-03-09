import React, { useEffect, useState } from "react";
import axios from "axios"


function UserHomepage(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("/User")
            .then((res) => {
                console.log(res);
                setUser(res);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
        <h1>UserHomepage Page</h1>
        {/* <h1>{user.data.displayName}</h1> */}
        </div>
    )

}


export default UserHomepage;