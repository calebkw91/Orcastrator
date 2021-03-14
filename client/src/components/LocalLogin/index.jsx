import React, { useState } from "react";
import "./style.css";


function LocalSignup() {

    const [localUser, setLocalUser] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setLocalUser({ ...localUser, [name]: value });
    };

    const login = () => {

    }

    return (
        <div className="mx-auto row justify-content-center align-self-center wrapper">
            <div className="col-12">
                <div className="justify-content-center">
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="emailAddress" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="emailAddress" aria-describedby="email" required
                                        name="email"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password1" className="form-label">Password</label>
                                    <input type="text" className="form-control" id="password1" required
                                        name="password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalSignup;