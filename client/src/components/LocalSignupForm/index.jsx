import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function LocalSignup() {

    const [localUser, setLocalUser] = useState({
        id: Date.now().toString(),
        name: "",
        portrait: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "avatar") {
            setLocalUser({ ...localUser, portrait: event.target.attributes.urlsrc.value });
        }
        else {
            setLocalUser({ ...localUser, [name]: value });
        };
    };

    const createAccount = (event) => {
        event.preventDefault();
        if (!localUser.name || !localUser.portrait || !localUser.password) {
            alert("Please fill out all fields");
        }
        else {
            axios.post("/signup", { ...localUser })
                .then(() => {
                    window.location.assign("/login");
                    alert("Account Created");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Username is unavailable");
                });
        };
    };

    return (
        <div className="mx-auto justify-content-center wrapper">
            <div className="col-12">
                <div >
                    <div className="card card-position">
                        <div className="card-header">
                            <h3>Create an Account</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <h5>Choose an Avatar</h5>
                                <div className="btn-group" id="avatarSelect" data-toggle="buttons">

                                    <input className="toggle" type="radio" id="avatar1" urlsrc="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451_960_720.png" 
                                    name="avatar" 
                                    onClick={handleInputChange}
                                     />
                                    <label className="form-check-label" htmlFor="avatar1">
                                        <img className="avatars" alt="avatar1" src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451_960_720.png" />
                                    </label>

                                    <input className="toggle" type="radio" id="avatar2" urlsrc="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png"
                                        name="avatar"
                                        onClick={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="avatar2">
                                        <img className="avatars" alt="avatar2" src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png" />
                                    </label>

                                    <input className="toggle" type="radio" id="avatar3" urlsrc="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
                                        name="avatar"
                                        onClick={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="avatar3">
                                        <img className="avatars" alt="avatar3" src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png" />
                                    </label>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" aria-describedby="username"
                                        name="name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password1" className="form-label">Password</label>
                                    <input type="text" className="form-control" id="password1"
                                        name="password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={createAccount}>Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalSignup;