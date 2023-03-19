import { motion } from "framer-motion";
import { useState } from "react";


const Contact = () => {

    return ( 
        <>
          <div className="container mx-auto h-auto px-4 sm:px-20 py-10 border border-lightGrey">
            <p className="font-satoshi text-3xl sm:text-5xl">Contact Me</p>
            <div className="mx-auto w-auto py-20 flex justify-center">
            <div className="font-figtree h-auto space-y-8">
                <div className="flex flex-col space-y-4">
                    <label className="text-xl sm:text-2xl">Name</label>
                    <input type="name" className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey" placeholder="Anakin Skywalker"></input>
                </div>
                <div className="flex flex-col space-y-4">
                    <label className="text-xl sm:text-2xl">Email</label>
                    <input type="name" className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey" placeholder="chosenone@skywalker.com"></input>
                </div>
                <div className="flex flex-col space-y-4">
                    <label className="text-xl sm:text-2xl">Message</label>
                    <textarea type="name" className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey" placeholder="This is where the fun begins"></textarea>
                </div>
                <div className="px-24 cursor-pointer ">
                    <div className="px-10 py-4 text-center border border-lightGrey hover:border-lightBlue hover:border-2 hover:text-lightBlue">
                    <motion.button>
                        Send
                    </motion.button>
                    </div>
                </div>
            </div>
        </div>  
        </div>
        </>
     );
}
 
export default Contact;