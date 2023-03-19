import logo from '../assets/logo.svg';
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {

    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    const spring = {
        type: "spring",
        stiffness: 200,
        damping: 30,
    };

    return ( 
        <nav className="sticky top-0 z-10 bg-background">
            <div className="container mx-auto sm:py-10 py-5 px-4 sm:px-20 border border-lightGrey flex justify-between">
                <div className="">
                    <img src={logo} className="h-10 w-10"/>
                </div>
                <div className="font-figtree hidden sm:flex space-x-12 text-sm sm:text-2xl font-light">
                    <motion.span className="cursor-pointer">
                        home
                    </motion.span>
                    <p className="cursor-pointer">about</p>
                    <p className="cursor-pointer">contact</p>
                    <div className="switch w-14 h-8 mt-1 bg-lightGrey rounded-full p-1 flex flex-initial" data-isOn={isOn} onClick={toggleSwitch}>
                        <motion.div className="w-6 h-6 bg-white rounded-full cursor-pointer" layout transition={spring}/>
                    </div>
                </div>
                <div className="sm:hidden border border-white bg-lightBlue rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div className="px-10 py-4 space-y-2 text-xl border border-lightGrey hidden">
                <p>home</p>
                <p>home</p>
            </div>
        </nav>
     );
}
 
export default Navbar;
