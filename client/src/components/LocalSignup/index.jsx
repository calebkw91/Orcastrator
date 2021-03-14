import React, { useState } from "react";
import "./style.css";


function LocalSignup() {

    const [localUser, setLocalUser] = useState({
        id: "",
        name: "",
        portrait: "",
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        console.log(event)
        const value = event.target.value;
        const name = event.target.name;
        if (name === "avatar") {
            setLocalUser({ ...localUser, avatar: event.target.attributes.urlsrc.value });
        }
        else {
            setLocalUser({ ...localUser, [name]: value });
        };
    };

    const createAccount = () => {

    }

    return (
        <div className="mx-auto row justify-content-center align-self-center wrapper">
            <div className="col-12">
                <div className="justify-content-center">
                    <div className="card">
                        <div className="card-header">
                            <h3>Create an Account</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <h5>Choose an Avatar</h5>
                                <div className="btn-group" id="avatarSelect" data-toggle="buttons" >

                                    <input className="toggle" type="radio" id="avatar1" urlsrc="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451_960_720.png" required
                                        name="avatar"
                                        onClick={handleInputChange} />
                                    <label className="form-check-label" htmlFor="avatar1">
                                        <img alt="avatar1" src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451_960_720.png" />
                                    </label>

                                    <input className="toggle" type="radio" id="avatar2" urlsrc="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png"
                                        name="avatar"
                                        onClick={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="avatar2">
                                        <img alt="avatar2" src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png" />
                                    </label>

                                    <input className="toggle" type="radio" id="avatar3" urlsrc="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
                                        name="avatar"
                                        onClick={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="avatar3">
                                        <img alt="avatar3" src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png" />
                                    </label>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emailAddress" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="emailAddress" aria-describedby="email" required
                                        name="email"
                                        onChange={handleInputChange}
                                    />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password1" className="form-label">Password</label>
                                    <input type="text" className="form-control" id="password1" required
                                        name="password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="userName" required
                                        name="name"
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