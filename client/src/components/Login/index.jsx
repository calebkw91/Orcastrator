import React from "react";
import Button from "react-bootstrap/Button";

function Login() {

    const googleLogin = () => {
        window.open("http://localhost:8080/auth/google", "_self");
    }

    const githubLogin = () => {
        window.open("http://localhost:8080/auth/github", "_self");
    }

    return(
    <div className="mx-auto row justify-content-center align-self-center">
        <h1 className="title-header">Orcastrate</h1>
        <h3 className="title-subheader">Orchestrate your group</h3>
        <div className="col-12">
            <div className="justify-content-center">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
                        <Button variant="success"><span onClick={googleLogin}><i className="fab fa-google-plus-square"></i></span></Button>{' '}
                        <Button variant="dark"><span onClick={githubLogin}><i class="fab fa-github"></i></span></Button>
                    </div>               
                </div>
            </div>
        </div>

    </div>
    )
}

export default Login;