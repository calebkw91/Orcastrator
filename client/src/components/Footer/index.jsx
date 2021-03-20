import React from "react";
import footer from "./footer-image.png";
import frontFooter from "./footer-image-front.png";
import rearFooter from "./footer-image-rear.png";
import ReactAnime from "react-animejs";
import "./style.css";

function Footer({ children }) {
  const { Anime, stagger } = ReactAnime;
  return (
    <div>
      <Anime
        initial={[
          {
            targets: ".rear",
            translateY: 10,
            loop: true,
            direction: "alternate",
            easing: "easeOutInSine",
            delay: 500,
            duration: 5000
          },
        ]}
      >
        <img className="footer rear" alt="waves" src={rearFooter}></img>
      </Anime>
      <img className="footer middle" alt="Orca Breaching" src={footer}></img>
      <Anime
        initial={[
          {
            targets: ".front",
            translateY: 10,
            loop: true,
            direction: "alternate",
            easing: "easeOutInSine",
            duration: 3000,
            delay: stagger(500)
          },
        ]}
      >
        <img className="footer front" alt="waves" src={frontFooter}></img>
      </Anime>
    </div>
  );
}

export default Footer;
