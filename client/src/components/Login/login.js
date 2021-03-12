import React from "react"


function login() {

    const googleLogin = () => {
        window.open("http://localhost:8080/auth/google", "_self");
    }

    const githubLogin = () => {
        window.open("http://localhost:8080/auth/github", "_self");
    }

    return(
    <div>
        <h1>Login Page</h1>
        <button onClick={googleLogin}> Login With Google</button>
        <button onClick={githubLogin}> Login With Github</button>
    </div>
    )
}

export default login;