import "../utils/scroll.css";
import React from "react";
import { Reveal } from "../utils/Reveal";

const Home = () => {
  const scrollToComponent = () => {
    const component = document.getElementById("about");
    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 sm:mx-28" id="home">
      <div className="container mx-auto my-5 font-figtree py-10 px-4 sm:px-20 h-auto border-l border-r border-lightGrey">
        <div className="space-y-3 sm:space-y-5">
          <Reveal>
            <p className="font-satoshi font-light text-2xl sm:text-4xl tracking-wide">
              Hi,I'm
            </p>
          </Reveal>
          <Reveal>
            <p className="font-semibold sm:ml-10 text-5xl sm:text-8xl tracking-widest">
              ROHAN
            </p>
          </Reveal>
          <Reveal>
            <p className="font-semibold sm:ml-56 text-5xl sm:text-8xl tracking-widest">
              YADAV
            </p>
          </Reveal>
          <Reveal>
            <p className="text-2xl sm:text-5xl sm:py-8 font-light">
              UI Designer &<br />
              Developer
            </p>
          </Reveal>
        </div>
        <div className="w-auto">
          <div
            className="h-10 sm:h-20 absolute bottom-0 left-1/2 cursor-pointer mouse"
            onClick={scrollToComponent}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
