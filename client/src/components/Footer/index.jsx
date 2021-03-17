import React from "react";
import footer from "./footer-image.png";



function Footer({ children }) {
    return (
        <div className="footer" fixed="bottom">
            <img src={footer}></img>
        </div>
    )
}

export default Footer;