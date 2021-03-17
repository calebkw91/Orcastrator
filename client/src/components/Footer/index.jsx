import React from "react";
import footer from "./footer-image.png";
import "./style.css"



function Footer({ children }) {
    return (
        <div className="footer" fixed="bottom">
            <img src={footer}></img>
        </div>
    )
}

export default Footer;