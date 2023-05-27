import logo from "../../assets/svg/logo.svg";
import { useState, useEffect, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "../utils/MenuToggle";

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isClick, setisClicked] = useState(false);

  const containerRef = useRef(null);

  const scrollToComponent = (cmpnt) => {
    const component = document.getElementById(cmpnt);
    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
    }
  };

  const variantsUl = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setisClicked(false);
        toggleOpen();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.nav
      className="sticky top-0 z-10 bg-background mx-4 sm:mx-28 pt-5"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
    >
      <div className="container mx-auto py-4 sm:py-4 px-4 sm:px-20 border border-lightGrey flex justify-between">
        <div className="">
          <img alt="logo" src={logo} className="h-10 w-10" />
        </div>
        <div className="font-figtree hidden sm:flex space-x-12 text-sm sm:text-2xl font-light">
          <motion.a
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => {
              scrollToComponent("home");
            }}
            className="cursor-pointer"
          >
            home
          </motion.a>
          <motion.a
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => {
              scrollToComponent("about");
            }}
            className="cursor-pointer"
          >
            about
          </motion.a>
          <motion.a
            onClick={() => {
              scrollToComponent("project");
            }}
            className="cursor-pointer"
          >
            project
          </motion.a>
          <motion.a
            onClick={() => {
              scrollToComponent("contact");
            }}
            className="cursor-pointer"
          >
            contact
          </motion.a>
        </div>

        <div className="sm:hidden px-3 pt-3 rounded-xl cursor-pointer">
          <MenuToggle
            toggle={() => {
              toggleOpen();
              setisClicked(!isClick);
            }}
          />
        </div>
      </div>
      <motion.ul
        className="px-10 mt-4 py-4 space-y-2 text-xl border border-lightGrey font-satoshi"
        style={{ display: isClick ? "block" : "none" }}
        variants={variantsUl}
      >
        <motion.li
          variants={variants}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            scrollToComponent("home");
          }}
        >
          home
        </motion.li>
        <motion.li
          variants={variants}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            scrollToComponent("about");
          }}
        >
          about
        </motion.li>
        <motion.li
          variants={variants}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            scrollToComponent("project");
          }}
        >
          project
        </motion.li>
        <motion.li
          variants={variants}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            scrollToComponent("contact");
          }}
        >
          contact
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
