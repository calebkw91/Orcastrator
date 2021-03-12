import React, { useEffect, useState } from "react";
import axios from "axios"


function UserHomepage(props) {

    const [user, setUser] = useState({displayName:""});

    useEffect(() => {
        axios.get("/User")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 center-text">
                    <h1>UserHomepage Page for {user.displayName}</h1>
                </div>
            </div>
        </div>
    )

}


export default UserHomepage;