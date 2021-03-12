import React from "react";
import footerimage from "./footer-image.png";



function Footer({ children }) {
    return (
        <div className="footer">
            <img src={footerimage} alt="Beautiful Breaching Orca"/>
        </div>
    )
}

export default Footer;