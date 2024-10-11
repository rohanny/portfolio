import React from "react";
import { Reveal } from "../utils/Reveal";
import "../utils/scroll.css";

const Home = () => {
  const scrollToComponent = () => {
    const component = document.getElementById("about");
    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 sm:mx-28" id="home">
      <div className="container mx-auto my-5 font-figtree py-10 px-4 sm:px-20 h-1/2 space-y-32 sm:space-y-0 sm:h-auto border-l border-r border-borderColor">
        <div className="space-y-3 sm:space-y-5">
          <Reveal>
            <p className="font-satoshi font-light text-xl py-2 md:text-2xl sm:text-4xl tracking-wide">
              Hi,I'm
            </p>
          </Reveal>
          <Reveal>
            <p className="font-semibold ml-0 lg:ml-10 text-3xl md:text-7xl sm:text-8xl tracking-widest">
              ROHAN
            </p>
          </Reveal>
          <Reveal>
            <p className="font-semibold lg:ml-56 text-3xl md:text-7xl sm:text-8xl tracking-widest">
              YADAV
            </p>
          </Reveal>
          <Reveal>
            <p className="md:hidden text-xl sm:text-3xl sm:py-8 font-light">
              UI Designer & Developer
            </p>
            <p className="hidden md:block text-2xl sm:text-3xl md:text-4xl sm:py-8 font-light">
              UI Designer &<br />
              Developer
            </p>
          </Reveal>
        </div>
        <div className="w-full">
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
