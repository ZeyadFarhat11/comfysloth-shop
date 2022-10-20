import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../imgs/about.jpeg";
import "../style/about.scss";

function About() {
  return (
    <main className="about">
      <div className="page-path container">
        <Link to="/">home</Link> / about
      </div>
      <div className="story container">
        <img src={aboutImg} alt="table" />
        <div className="text">
          <div className="main-title">our story</div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            accusantium sapiente tempora sed dolore esse deserunt eaque
            excepturi, delectus error accusamus vel eligendi, omnis beatae.
            Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
            dolore, obcaecati incidunt sequi blanditiis est exercitationem
            molestiae delectus saepe odio eligendi modi porro eaque in libero
            minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
            ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
            similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
            iste.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
