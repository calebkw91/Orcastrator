import React from "react";
import Navbar from "react-bootstrap/Navbar";
import footer from "./footer-image.png";



function Footer({ children }) {
    return (
        <Navbar className="blah" fixed="bottom">
            <img src={footer}></img>
        </Navbar>
    )
}

export default Footer;