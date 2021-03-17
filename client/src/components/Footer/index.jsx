import React from "react";
import footer from "./footer-image.png";
import frontFooter from "./footer-image-front.png";
import rearFooter from "./footer-image-rear.png";
import "./style.css"



function Footer({ children }) {
    return (
        <div fixed="bottom">
            <img className="footer rear" alt="waves" src={rearFooter}></img>
            <img className="footer middle" alt="Orca Breaching" src={footer}></img>
            <img className="footer front" alt="waves" src={frontFooter}></img>
        </div>
    )
}

export default Footer;