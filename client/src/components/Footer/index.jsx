import React from "react";
import Navbar from "react-bootstrap/Navbar";
import footer from "./footer-image.png";



function Footer({ children }) {
    return (
        <div className="blah">
            <img src={footer}></img>
        </div>
    )
}

export default Footer;